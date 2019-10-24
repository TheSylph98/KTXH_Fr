<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="userList"
    :pagination="pagination"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getUserList({queryData: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <User  
        v-if="dialog" 
        :user="user_data" 
        :formTitle="titleDialog" 
        @close="closeDialog" 
        @save="saveChiTieuDialog" />
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
      overlay: false,
      titleDialog: "",
      user_data: {},
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
    ...mapState("quantri/qtUser", ["userList", "user", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtUser/getUserList");
  },

  async created() {
    if (!this.userList.length) {
      this.overlay = true
      await this.getUserList()
      this.overlay = false
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
      this.titleDialog = "Thêm user mới";
      this.user_data = {
        ma: "",
        ten: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        qtDonViId: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getQTUser(Number(item.id))
      this.user_data = Object.assign({}, this.user)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteQTUser(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.user_data = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateQTUser(this.user_data);
      } else {
        await this.addQTUser(this.user_data);
      }
      this.closeDialog();
    },

    async changeList(value) {
      this.overlay = true;
      await this.getUserList(value);
      this.overlay = false;
    },

  }
};
</script>