<template>
  <Table
    :title="title"
    :headers="headers"
    :items="userList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <User  
        v-if="dialog" 
        :user="user" 
        :formTitle="titleDialog" 
        @close="closeDialog" 
        @save="saveChiTieuDialog" />
    </v-dialog>
  </Table>
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
      titleDialog: "",
      user: {},
      headers: [
        {
          text: "Họ và Tên",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Số điện thoại",
          align: "center",
          sorttable: false,
          value: "soDienThoai",
          type: "string"
        },
        {
          text: "Email",
          align: "center",
          sorttable: false,
          value: "email",
          type: "string"
        },
        {
          text: "Đơn Vị",
          align: "center",
          sorttable: false,
          value: "donvi",
          type: "string"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          type: ""
        }
      ]
    };
  },
  computed: {
    ...mapState("quantri/qtUser", ["userList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtUser/getQTUserList");
  },

  created() {
    this.getQTUserList();
    this.getDonViList();
  },

  methods: {
    ...mapActions("quantri/qtUser", [
      "getQTUserList",
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
      this.titleDialog = "Thêm user mới";
      this.user = {
        ma: "",
        ten: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        qtDonViId: 0
      };
    },
    edit(item) {
      this.user = this.userList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.userList.indexOf(item);
      confirm("Xác nhận xóa?") && this.userList.splice(index, 1);
      this.deleteBieuNhapLieuTruongDuLieu(this.user);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.user = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateBieuNhapLieuTruongDuLieu(this.user);
      } else {
        this.addBieuNhapLieuTruongDuLieu(this.user);
      }
      this.closeDialog();
    }
  }
};
</script>