<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="chiTieuNhomList"
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
      @filter="getChiTieuNhomList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <ChiTieuNhom
          v-if="dialog"
          :chiTieuNhom="ctNhom"
          :formTitle="titleDialog"
          :isWatch="isWatch"
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
import ChiTieuNhom from "@/components/Dialog/ChiTieu/ChiTieuNhom";

export default {
  components: {
    Table,
    ChiTieuNhom
  },

  data() {
    return {
      title: "Khai Báo Nhóm Chỉ Tiêu",
      dialog: false,
      overlay: false,
      isUpdate: false,
      titleDialog: "",
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
          text: "Tên nhóm chỉ tiêu",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string",
          width: "29.75%"
        },
        {
          text: "Ghi Chú",
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
      ctNhom: {},
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("chitieu/chiTieuNhom", [
      "chiTieuNhomList",
      "chi_tieu_nhom",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuNhom/getChiTieuNhomList");
  },

  async created() {
    if (!this.chiTieuNhomList.length) {
      this.overlay = true;
      await this.getChiTieuNhomList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("chitieu/chiTieuNhom", [
      "getChiTieuNhomList",
      "getChiTieuNhom",
      "addChiTieuNhom",
      "updateChiTieuNhom",
      "deleteChiTieuNhom",
      "restoreChiTieuNhom"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm chỉ tiêu nhóm mới";
      this.ctNhom = {
        ma: null,
        ten: null,
        ghiChu: ""
      };
    },
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem chỉ tiêu nhóm";
      await this.getChiTieuNhom(Number(item.id));
      this.ctNhom = Object.assign({}, this.chi_tieu_nhom);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa chỉ tiêu nhóm";
      await this.getChiTieuNhom(Number(item.id));
      this.ctNhom = Object.assign({}, this.chi_tieu_nhom);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteChiTieuNhom(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa chỉ tiêu nhóm thành công!";
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
      this.ctNhom = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateChiTieuNhom(this.ctNhom);
      } else {
        res = await this.addChiTieuNhom(this.ctNhom);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật chỉ tiêu nhóm thành công"
          : "Thêm chỉ tiêu nhóm thành công!";
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
      await this.getChiTieuNhomList(value);
      this.overlay = false;
    }
  }
};
</script>