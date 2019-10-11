<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuPhanToList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <ChiTieuPhanTo/>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import ChiTieuPhanTo from "@/components/Dialog/ChiTieuPhanTo"

export default {
  components: {
    Table,
    ChiTieuPhanTo
  },
  data() {
    return {
      title: "Nhóm Chỉ Tiêu Phân Tổ",
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
          text: "Nội Dung",
          align: "center",
          sorttable: false,
          value: "noiDung",
          type: "string"
        },
        {
          text: "Ghi chú",
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
    ...mapState("chiTieuPhanTo", ["chiTieuPhanToList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("chiTieuPhanTo/getChiTieuPhanToList");
  },

  created() {
    this.getChiTieuPhanToList();
  },

  methods: {
    ...mapActions("chiTieuPhanTo", [
      "getChiTieuPhanToList",
      "getChiTieuPhanTo",
      "addChiTieuPhanTo",
      "updateChiTieuPhanTo",
      "deleteChiTieuPhanTo",
      "restoreChiTieuPhanTo"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addKyBaoCao(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteKyBaoCao(this.editedItem);
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