<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="namLamViecList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      :tableWidth="{
        checkbox: '2.25%',
        index: '4.25%',
        action: '8.5%'
      }"
      @edit="clickEdit($event)"
      @watch="clickWatch($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getNamLamViecList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <NamBaoCao
          v-if="dialog"
          :namBaoCao="namBC"
          :formTitle="titleDialog"
          :isUpdate="isUpdate"
          :isWatch="isWatch"
          @close="closeDialog"
          @save="saveNamBaoCaoDialog"
        />
      </v-dialog>
    </Table>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import NamBaoCao from "@/components/Dialog/BaoCao/NamBaoCao";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    NamBaoCao
  },
  data() {
    return {
      title: "Năm Báo Cáo",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      namBC: {},
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Tên báo cáo",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string",
          width: "21.25%"
        },
        {
          text: "Năm",
          align: "center",
          sorttable: true,
          value: "nam",
          type: "number",
          width: "8.5%"
        },
        
        {
          text: "Ngày mở báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayMoNam",
          type: "date",
          width: "8.5%"
        },
        {
          text: "Ngày đóng báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayDongNam",
          type: "date",
          width: "8.5%"
        },
        {
          text: "Ghi chú",
          align: "center",
          value: "ghiChu",
          type: "string",
          width: "25.5%"
        }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("quanly/qlNamLamViec", ["namLamViecList", "namLamViec", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quanly/qlNamBaoCao/getNamLamViecList");
  },

  async created() {
    if (!this.namLamViecList.length) {
      this.overlay = true;
      await this.getNamLamViecList();
      await this.getTrangThaiDongMoList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quanly/qlNamLamViec", [
      "getNamLamViecList",
      "getNamLamViec",
      "addNamLamViec",
      "updateNamLamViec",
      "deleteNamLamViec",
      "restoreNamLamViec"
    ]),
    ...mapActions("sys/sysTrangThaiDongMo", ["getTrangThaiDongMoList"]),

    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem Năm báo cáo";
      await this.getNamLamViec(Number(item.id));
      this.namBC = Object.assign({}, this.namLamViec);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm năm báo cáo mới";
      this.namBC = {
        ma: null,
        nam: null,
        ten: "",
        sysTrangThaiDongMoId: null,
        ngayMoNam: null,
        ngayDongNam: null,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa kỳ báo cáo";
      await this.getNamLamViec(Number(item.id));
      this.namBC = Object.assign({}, this.namLamViec);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const res = await this.deleteNamLamViec(items.map(e => e.id));
      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa kỳ báo cáo thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.isWatch = true;
      this.namBC = {};
      this.titleDialog = "";
    },

    async saveNamBaoCaoDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateNamLamViec(this.namBC);
      } else {
        res = await this.addNamLamViec(this.namBC);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật năm báo cáo thành công!"
          : "Thêm năm báo cáo thành công";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.snackbar = true;

      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    async changeList(value) {
      value.pageSize = value.pageSize
        ? value.pageSize
        : this.pagination.pageSize;
      value.page = value.page !== undefined ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getNamLamViecList(value);
      this.overlay = false;
    }
  }
};
</script>