<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="kyBaoCaoList"
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
      @filter="getKyBaoCaoList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <KyBaoCao
          v-if="dialog"
          :kyBaoCao="kyBC"
          :formTitle="titleDialog"
          :isUpdate="isUpdate"
          :isWatch="isWatch"
          @close="closeDialog"
          @save="saveKyBaoCaoDialog"
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
import KyBaoCao from "@/components/Dialog/BaoCao/KyBaoCao";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    KyBaoCao
  },
  data() {
    return {
      title: "Kỳ báo cáo",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      kyBC: {},
      headers: [
        {
          text: "Năm",
          align: "center",
          sorttable: true,
          value: "nam",
          type: "number",
          width: "8.5%"
        },
        {
          text: "Mã",
          align: "left",
          sorttable: true,
          value: "ma",
          type: "string",
          width: "18.5%"
        },
        {
          text: "Kỳ báo cáo",
          align: "left",
          sorttable: false,
          value: "ten",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Ngày mở báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayMo",
          type: "date",
          width: "8.5%"
        },
        {
          text: "Ngày đóng báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayDong",
          type: "date",
          width: "8.5%"
        },
        {
          text: "Trạng thái",
          align: "center",
          value: "trangThai",
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
    ...mapState("quanly/qlKyBaoCao", ["kyBaoCaoList", "kyBaoCao", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quanly/qlKyBaoCao/getKyBaoCaoList");
  },

  async created() {
    if (!this.kyBaoCaoList.length) {
      this.overlay = true;
      await this.getKyBaoCaoList();
      //await this.getLoaiBaoCaoList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quanly/qlKyBaoCao", [
      "getKyBaoCaoList",
      "getKyBaoCao",
      "addKyBaoCao",
      "updateKyBaoCao",
      "deleteKyBaoCao",
      "restoreKyBaoCao"
    ]),
    ...mapActions("sys/sysLoaiBaoCao", ["getLoaiBaoCaoList"]),

    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem kỳ báo cáo";
      await this.getKyBaoCao(Number(item.id));
      this.kyBC = Object.assign({}, this.kyBaoCao);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm kỳ báo cáo mới";
      this.kyBC = {
        nam: null,
        ma: null,
        ten: "",
        sysLoaiBaoCaoId: null,
        ngayMo: null,
        ngayDong: null,
        ngayBatDau: null,
        ngayTongHop: null,
        ngayBaoCaoHuyen: null,
        ngayBaoCaoTinh: null,
        ngayBaoCaoTW: null,
        trangThai: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa kỳ báo cáo";
      await this.getKyBaoCao(Number(item.id));
      this.kyBC = Object.assign({}, this.kyBaoCao);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const res = await this.deleteKyBaoCao(items.map(e => e.id));
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
      this.kyBC = {};
      this.titleDialog = "";
    },

    async saveKyBaoCaoDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateKyBaoCao(this.kyBC);
        this.closeDialog();
      } else {
        res = await this.addKyBaoCao(this.kyBC);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật kỳ báo cáo thành công!"
          : "Thêm kỳ báo cáo thành công";
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
      await this.getKyBaoCaoList(value);
      this.overlay = false;
    }
  }
};
</script>