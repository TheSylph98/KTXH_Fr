<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tacNhanList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <TacNhan/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import TacNhan from "@/components/Dialog/TacNhan"

export default {
  components: {
    Table,
    TacNhan
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      headers: [
        {
          text: "Tên tác nhân",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Cấp hành chính",
          align: "center",
          sorttable: false,
          value: "sysCapHanhChinhId",
          type: ""
        },
        {
          text: "Chức năng, nhiệm vụ",
          align: "center",
          sorttable: false,
          value: "ghiChu",
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
        sysCapHanhChinhId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("qtTacNhan", ["tacNhanList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("qtTacNhan/getQTTacNhanList");
  },

  created() {
    this.getQTTacNhanList();
  },

  methods: {
    ...mapActions("qtTacNhan", [
      "getQTTacNhanList",
      "getQTTacNhan",
      "addQTTacNhan",
      "updateQTTacNhan",
      "deleteQTTacNhan",
      "restoreQTTacNhan"
    ]),
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addQTTacNhan(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteQTTacNhan(this.editedItem);
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