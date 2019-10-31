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
      @edit="clickEdit($event)"
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
      title: "Khai Báo Kỳ Báo Cáo",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      kyBC: {},
      headers: [
        {
          text: "Năm",
          align: "center",
          sorttable: true,
          value: "nam",
          type: "number"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Kỳ báo cáo",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ngày mở báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayMo",
          type: "date"
        },
        {
          text: "Ngày đóng báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayDong",
          type: "date"
        },
        {
          text: "Trạng Thái",
          align: "center",
          value: "trangThai",
          type: "string"
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

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm kỳ báo cáo mới";
      this.kyBC = {
        nam: "",
        ma: "",
        ten: "",
        //sysCapHanhChinhId: 0,
        ngayMo: "",
        ngayDong: "",
        ngayBatDau: "",
        ngayTongHop: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        ngayBaoCaoTW: "",
        trangThai: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getKyBaoCao(Number(item.id));
      this.kyBC = Object.assign({}, this.kyBaoCao);
      this.isUpdate = true;
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
      this.kyBC = {};
    },

    async saveKyBaoCaoDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateKyBaoCao(this.kyBC);
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
      this.overlay = true;
      await this.getKyBaoCaoList(value);
      this.overlay = false;
    }
  }
};
</script>