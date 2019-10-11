<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuPhanToChiTietList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import ChiTieuPhanToChiTiet from "@/components/Dialog/ChiTieuPhanToChiTiet" 

export default {
  components: {
    Table,
    ChiTieuPhanToChiTiet
  },
  data() {
    return {
      title: "Chỉ Tiêu Phân Tổ Chi Tiết",
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
          text: "Nội dung",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string"
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        chiTieuPhanToId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        chiTieuPhanToId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("chiTieuPhanToChiTiet", [
      "chiTieuPhanToChiTietList",
      "pagination"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("chiTieuPhanToChiTiet/getChiTieuPhanToChiTietList");
  },

  created() {
    this.getChiTieuPhanToChiTietList();
  },

  methods: {
    ...mapActions("chiTieuPhanToChiTiet", [
      "getChiTieuPhanToChiTietList",
      "getChiTieuPhanToChiTiet",
      "addChiTieuPhanToChiTiet",
      "updateChiTieuPhanToChiTiet",
      "deleteChiTieuPhanToChiTiet",
      "restoreChiTieuPhanToChiTiet"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addChiTieuPhanToChiTiet(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteChiTieuPhanToChiTiet(this.editedItem);
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