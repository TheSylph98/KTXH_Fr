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
      :selectItem="selectItem"
      :timeout="timeout"
      :tableWidth="{
        'checkbox': '2.25%',
        'index': '4.25%',
        'action': '8.5%'
      }"
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
      <template v-slot:action="{ row }">
        <Icon btnIcon="mdi-eye" btnTooltip="Xem" @click="clickWatch(row.item)" />
        <Icon btnIcon="mdi-pencil" btnTooltip="Chỉnh sửa" @click="clickEdit(row.item)" />
        <Icon btnIcon="mdi-delete" btnTooltip="Xóa" @click="clickDeleteItem(row.item)" />
        <Icon btnIcon="mdi-drag" btnTooltip="Chọn tác nhân" @click="chonTacNhan(row.item)"></Icon>
      </template>
    </Table>

    <v-dialog v-model="deletedDialog" width="500" @click:outside="closeDeleteDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Xóa người dùng</v-card-title>

        <v-card-text>Bạn có chắc chắn muốn xóa hay không?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDeleteDialog">Huỷ</v-btn>
          <v-btn color="primary" text @click="deleted(deleteItems)">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pickTacNhandialog" width="800" @click:outside="ClosePickDialog">
      <UserTacNhan
        v-if="pickTacNhandialog"
        :title="nameUser"
        :user="UserProfile"
        @close="ClosePickDialog"
      ></UserTacNhan>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import User from "@/components/Dialog/Quantri/User";
import Icon from "@/components/Icon";
import UserTacNhan from "@/components/Dialog/Quantri/UserTacNhan";

export default {
  components: {
    Table,
    User,
    Icon,
    UserTacNhan
  },

  data() {
    return {
      title: "Khai Báo Người Dùng",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      deletedDialog: false,
      pickTacNhandialog: false,
      user_data: {},
      UserProfile: {},
      deleteItems: [],

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
      nameUser: "",
      selectItem: {},
      timeout: 1000
    };
  },

  computed: {
    ...mapState("quantri/qtUser", ["userList", "user", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("/quantri/qtUser/getUserList");
  },

  async created() {
    if (!this.userList.length) {
      this.overlay = true;
      await this.getUserList();
      this.overlay = false;
    }
  },

  async mounted() {
    await Promise.all([this.getDonViList(), this.getTacNhanList()]);
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
    ...mapActions("quantri/qtTacNhan", ["getTacNhanList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
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
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem người dùng";
      await this.getQTUser(Number(item.id));
      this.user_data = Object.assign({}, this.user);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa người dùng";
      await this.getQTUser(Number(item.id));
      this.user_data = Object.assign({}, this.user);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    clickDeleteItem(value) {
      this.deleteItems = [value];
      this.deletedDialog = true;
    },

    closeDeleteDialog() {
      this.deletedDialog = [];
      this.deletedDialog = false;
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

      this.deletedDialog = false;
      this.deleteItems = {};

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

      this.pickTacNhandialog = false;
      this.UserProfile = {};
      this.nameUser = "";
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

    chonTacNhan(item) {
      this.UserProfile = item;
      this.nameUser = "Tên người sử dụng: " + item.ten;
      this.pickTacNhandialog = true;
    },

    async ClosePickDialog() {
      this.pickTacNhandialog = false;
      this.UserProfile = {};
      this.nameUser = "";
      await this.getTacNhanList();
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