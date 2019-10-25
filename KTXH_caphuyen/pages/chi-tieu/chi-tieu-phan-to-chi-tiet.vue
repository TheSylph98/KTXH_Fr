<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="chiTieuPhanToChiTietList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      @edit="clickEdit($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getChiTieuPhanToChiTietList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <ChiTieuPhanToChiTiet
          v-if="dialog"
          :chiTieuPhanToChiTiet="chiTieuPhanToChiTiet"
          :formTitle="titleDialog"
          @close="closeDialog"
          @save="saveChiTieuDialog"
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
import { mapState, mapActions } from "vuex";
import ChiTieuPhanToChiTiet from "@/components/Dialog/ChiTieu/ChiTieuPhanToChiTiet";

export default {
  components: {
    Table,
    ChiTieuPhanToChiTiet
  },

  data() {
    return {
      title: "Chỉ Tiêu Phân Tổ Chi Tiết",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      chiTieuPhanToChiTiet: {},
      titleDialog: "",
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Nội dung",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string"
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("chitieu/chiTieuPhanToChiTiet", [
      "chiTieuPhanToChiTietList",
      "chi_tieu_phan_to_chi_tiet",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuPhanToChiTiet/getChiTieuPhanToChiTietList");
  },

  async created() {
    if (!this.chiTieuPhanToChiTietList.length) {
      this.overlay = true;
      await this.getChiTieuPhanToChiTietList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("chitieu/chiTieuPhanToChiTiet", [
      "getChiTieuPhanToChiTietList",
      "getChiTieuPhanToChiTiet",
      "addChiTieuPhanToChiTiet",
      "updateChiTieuPhanToChiTiet",
      "deleteChiTieuPhanToChiTiet",
      "restoreChiTieuPhanToChiTiet"
    ]),
    ...mapActions("chitieu/chiTieuPhanTo", ["getChiTieuPhanToList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm mới chỉ tiêu phân tổ chi tiết";
      this.chiTieuPhanToChiTiet = {
        ma: "",
        ten: "",
        chiTieuPhanToId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getChiTieuPhanToChiTiet(Number(item.id));
      this.chiTieuPhanToChiTiet = Object.assign(
        {},
        this.chi_tieu_phan_to_chi_tiet
      );
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteChiTieuPhanToChiTiet(
        items.map(e => e.id)
      );

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa trường chỉ tiêu phân tổ chi tiết thành công!";
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
      this.chiTieuPhanToChiTiet = {};
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateChiTieuPhanToChiTiet(this.chiTieuPhanToChiTiet);
      } else {
        res = await this.addChiTieuPhanToChiTiet(this.chiTieuPhanToChiTiet);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật chỉ tiêu phân tổ chi tiết thành công"
          : "Thêm chỉ tiêu phân tổ chi tiết thành công!";
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
      await this.getChiTieuPhanToChiTietList(value);
      this.overlay = false;
    }
  }
};
</script>