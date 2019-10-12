<template>
  <Table
    :title="title"
    :headers="headers"
    :items="userList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <User/>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import User from "@/components/Dialog/User"

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
      titleDialog: '',
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
      ],
      
    }
  },
  computed: {
    ...mapState("qtUser", ["userList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("qtUser/getQTUserList");
  },

  created() {
    this.getQTUserList();
  },

  methods: {
    ...mapActions("qtUser", [
      "getQTUserList",
      "getQTUser",
      "addQTUser",
      "updateQTUser",
      "deleteQTUser",
      "restoreQTUser"
    ]),
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    clickAddNew() {
      this.dialog = true;
      this.truongNhapLieu = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        truongNhapLieuId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },
    edit(item) {
      this.truongNhapLieu = this.bnlTruongDuLieuList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.bnlTruongDuLieuList.indexOf(item);
      confirm("Xác nhận xóa?") && this.bnlTruongDuLieuList.splice(index, 1);
      this.deleteBieuNhapLieuTruongDuLieu(this.truongNhapLieu);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.truongNhapLieu = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateBieuNhapLieuTruongDuLieu(this.truongNhapLieu)
      } else {
        this.addBieuNhapLieuTruongDuLieu(this.truongNhapLieu)
      }
      this.closeDialog();
    },
  }
};
</script>