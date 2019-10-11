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
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        qtDonViId: 0,
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        qtDonViId: 0,
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("qtUser", ["userList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
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
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addQTUser(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteQTUser(this.editedItem);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>