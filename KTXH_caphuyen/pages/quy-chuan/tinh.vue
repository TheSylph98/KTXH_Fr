<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="tinhList"
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
      @filter="getTinhList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <Tinh
          v-if="dialog"
          :tinh="tinh_data"
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
import Table from "../../components/table.vue";
import { mapState, mapActions } from "vuex";
import Tinh from "@/components/Dialog/QuyChuan/Tinh";
export default {
  components: {
    Table,
    Tinh
  },

  data() {
    return {
      title: "Khai Báo Từ Điển: Tỉnh",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      tinh_data: {},
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttable: true,
          value: "ma",
          width: "12.75%",
          type: "string"
        },
        {
          text: "Tên",
          align: "center",
          sorttable: false,
          value: "ten",
          width: "34%",
          type: "string"
        },
        {
          text: "Ghi Chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          width: "29.75%",
          type: "string"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          width: "8.5%",
          type: ""
        }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("quychuan/qcTinh", ["tinhList", "tinh", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcTinh/getTinhList");
  },

  async created() {
    if (!this.tinhList.length) {
      this.overlay = true;
      await this.getTinhList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quychuan/qcTinh", [
      "getTinhList",
      "getTinh",
      "addTinh",
      "updateTinh",
      "deleteTinh",
      "restoreTinh"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm tỉnh mới";
      this.tinh_data = {
        ma: null,
        ten: null,
        sysCapDonViHanhChinh: null,
        loaiDonViHanhChinh: "",
        nongThon: false,
        bienGioi: false,
        haiDao: false,
        vungDBKhoKhan: false,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa tỉnh";
      await this.getTinh(Number(item.id));
      this.tinh_data = Object.assign({}, this.tinh);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteTinh(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa chỉ tỉnh thành công!";
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
      this.tinh_data = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateTinh(this.tinh_data);
      } else {
        res = await this.addTinh(this.tinh_data);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật tỉnh thành công"
          : "Thêm tỉnh thành công!";
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
      await this.getTinhList(value);
      this.overlay = false;
    }
  }
};
</script>