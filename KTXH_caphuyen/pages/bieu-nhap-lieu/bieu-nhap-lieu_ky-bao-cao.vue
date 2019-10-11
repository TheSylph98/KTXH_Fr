<template>
  <Table
    :title="title"
    :headers="headers"
    :items="items"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <BNLKyBaoCao/>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import BNLKyBaoCao from "@/components/Dialog/BieuNhapLieuKyBaoCao"

export default {
  components: {
    Table,
    BNLKyBaoCao
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Kỳ Báo Cáo",
      dialog: false,
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        qlKyBaoCaoId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        qlKyBaoCaoId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("bieuNhapLieuKyBaoCao", ["bnlKyBaoCaoList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("bieuNhapLieuKyBaoCao/getBieuNhapLieuKyBaoCaoList");
  },

  created() {
    this.getBieuNhapLieuKyBaoCaoList();
  },

  methods: {
    ...mapActions("bieuNhapLieuKyBaoCao", [
      "getBieuNhapLieuKyBaoCaoList",
      "getBieuNhapLieuKyBaoCao",
      "addBieuNhapLieuKyBaoCao",
      "updateBieuNhapLieuKyBaoCao",
      "deleteBieuNhapLieuKyBaoCao",
      "restoreBieuNhapLieuKyBaoCao"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addBieuNhapLieuKyBaoCao(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteBieuNhapLieuKyBaoCao(this.editedItem);
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