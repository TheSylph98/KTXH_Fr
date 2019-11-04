<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="chiTieuPhanToList"
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
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getChiTieuPhanToList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <ChiTieuPhanTo
          v-if="dialog"
          :chiTieuPhanTo="chiTieuPhanTo"
          :formTitle="titleDialog"
          :isUpdate="isUpdate"
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
import ChiTieuPhanTo from "@/components/Dialog/ChiTieu/ChiTieuPhanTo";

export default {
  components: {
    Table,
    ChiTieuPhanTo
  },
  data() {
    return {
      title: "Chỉ Tiêu Phân Tổ",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      chiTieuPhanTo: {},
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
          text: "Nội Dung",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string",
          width: "29.75%"
        },
        {
          text: "Ghi chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string",
          width: "38.25%"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          type: "",
          width: "8.5%"
        }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("chitieu/chiTieuPhanTo", [
      "chiTieuPhanToList",
      "chi_tieu_phan_to",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuPhanTo/getChiTieuPhanToList");
  },

  async created() {
    if (!this.chiTieuPhanToList.length) {
      this.overlay = true;
      await this.getChiTieuPhanToList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("chitieu/chiTieuPhanTo", [
      "getChiTieuPhanToList",
      "getChiTieuPhanTo",
      "addChiTieuPhanTo",
      "updateChiTieuPhanTo",
      "deleteChiTieuPhanTo",
      "restoreChiTieuPhanTo"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm chỉ tiêu phân tổ mới";
      this.chiTieuPhanTo = {
        ma: null,
        ten: null,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa chỉ tiêu phân tổ";
      await this.getChiTieuPhanTo(Number(item.id));
      this.chiTieuPhanTo = Object.assign({}, this.chi_tieu_phan_to);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteChiTieuPhanTo(
        items.map(e => e.id)
      );

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa chỉ tiêu phân tổ thành công!";
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
      this.chiTieuPhanTo = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateChiTieuPhanTo(this.chiTieuPhanTo);
      } else {
        res = await this.addChiTieuPhanTo(this.chiTieuPhanTo);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật chỉ tiêu phân tổ thành công"
          : "Thêm chỉ tiêu phân tổ thành công!";
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
      value.page = value.page ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getChiTieuPhanToList(value);
      this.overlay = false;
    }
  }
};
</script>