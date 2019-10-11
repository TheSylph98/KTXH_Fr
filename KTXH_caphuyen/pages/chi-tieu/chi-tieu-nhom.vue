<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuNhomList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <ChiTieuNhom/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import ChiTieuNhom from "@/components/Dialog/ChiTieuNhom"

export default {
  components: {
    Table,
    ChiTieuNhom
  },
  data() {
    return {
      title: "Khai Báo Nhóm Chỉ Tiêu",
      dialog: false,
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên nhóm chỉ tiêu KTXH",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi Chú",
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
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("chiTieuNhom", ["chiTieuNhomList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("chiTieuNhom/getChiTieuNhomList");
  },

  created() {
    this.getChiTieuNhomList();
  },

  methods: {
    ...mapActions("chiTieuNhom", [
      "getChiTieuNhomList",
      "getChiTieuNhom",
      "addChiTieuNhom",
      "updateChiTieuNhom",
      "deleteChiTieuNhom",
      "restoreChiTieuNhom"
    ]),

    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addChiTieuNhom(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteChiTieuNhom(this.editedItem);
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