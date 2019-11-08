<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="userList"
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
      @watch="clickWatch($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getUserList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <User
          v-if="dialog"
          :user="user_data"
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
import User from "@/components/Dialog/Quantri/User";

export default {
  components: {
    Table,
    User
  },

  data() {
    return {
      title: "Khai Báo Người Dùng",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      user_data: {},
      headers: [
        {
          text: "Họ và Tên",
          align: "center",
          value: "ten",
          width: "21.25%",
          type: "string"
        },
        {
          text: "Số điện thoại",
          align: "center",
          value: "soDienThoai",
          width: "12.75%",
          type: "string"
        },
        {
          text: "Email",
          align: "center",
          value: "email",
          width: "12.75%",
          type: "string"
        },
        {
          text: "Đơn Vị",
          align: "center",
          value: "belongsToQTDonVi.ten",
          width: "29.75%",
          type: "string"
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
    ...mapState("quantri/qtUser", ["userList", "user", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtUser/getUserList");
  },

  async created() {
    if (!this.userList.length) {
      this.overlay = true;
      await this.getUserList();
      this.overlay = false;
    }
  },

  async mounted() {
    await this.getDonViList();
  },

  methods: {
    ...mapActions("quantri/qtUser", [
      "getUserList",
      "getQTUser",
      "addQTUser",
      "updateQTUser",
      "deleteQTUser",
      "restoreQTUser"
    ]),
    ...mapActions("quantri/qtDonVi", ["getDonViList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm người dùng mới";
      this.user_data = {
        ma: null,
        ten: null,
        matKhau: null,
        soDienThoai: "",
        email: "",
        qtDonViId: 0,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa người dùng";
      await this.getQTUser(Number(item.id));
      this.user_data = Object.assign({}, this.user);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteQTUser(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa người dùng thành công!";
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
      this.user_data = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateQTUser(this.user_data);
        this.titleDialog = "";
      } else {
        res = await this.addQTUser(this.user_data);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật người dùng thành công"
          : "Thêm người dùng thành công!";
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
      await this.getUserList(value);
      this.overlay = false;
    }
  }
};
</script>