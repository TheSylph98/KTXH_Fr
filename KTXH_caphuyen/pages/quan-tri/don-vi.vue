<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="donViList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      :tableWidth="{
        'checkbox': '2.25%',
        'index': '4.25%',
        'action': '8.5%'
      }"
      @edit="clickEdit($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getQTDonViList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <DonVi
          v-if="dialog"
          :donVi="dv"
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
import DonVi from "../../components/Dialog/Quantri/DonVi";

export default {
  components: {
    Table,
    DonVi
  },

  data() {
    return {
      title: "Khai Báo Đơn Vị",
      dialog: false,
      isUpdate: false,
      overlay: false,
      dv: {},
      titleDialog: "",
      headers: [
        {
          text: "Mã đơn vị",
          align: "center",
          value: "ma",
          type: "string",
          width: "8.5%",
          divider: false
        },
        {
          text: "Tên đơn vị",
          width: "29.75%",
          align: "center",
          value: "ten",
          type: "string"
        },
        {
          text: "Số điện thoại",
          align: "center",
          value: "soDienThoai",
          type: "string",
          width: "12.75%",
          divider: false
        },
        {
          text: "Nhóm đơn vị",
          align: "center",
          value: "belongsToQTDonVi.ten",
          type: "string",
          width: "25.5%",
          divider: true
        },
        {
          text: "Hiệu lực",
          align: "center",
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
    ...mapState("quantri/qtDonVi", ["donViList", "donVi", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtDonVi/getQTDonViList");
  },

  async created() {
    if (!this.donViList.length) {
      this.overlay = true;
      await this.getQTDonViList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quantri/qtDonVi", [
      "getQTDonViList",
      "getQTDonVi",
      "addQTDonVi",
      "updateQTDonVi",
      "deleteQTDonVi",
      "restoreQTDonVi"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm đơn vị mới";
      this.dv = {
        ma: null,
        ten: null,
        diaChi: "",
        soDienThoai: "",
        donViChaId: 0,
        email: "",
        ghiChu: "",
        laDonVi: false
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa đơn vị";
      await this.getQTDonVi(Number(item.id));
      this.dv = Object.assign({}, this.donVi);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteQTDonVi(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa đơn vị thành công!";
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
      this.dv = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateQTDonVi(this.dv);
      } else {
        res = await this.addQTDonVi(this.dv);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật đơn vị thành công"
          : "Thêm đơn vị thành công!";
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
      await this.getQTDonViList(value);
      this.overlay = false;
    }
  }
};
</script>