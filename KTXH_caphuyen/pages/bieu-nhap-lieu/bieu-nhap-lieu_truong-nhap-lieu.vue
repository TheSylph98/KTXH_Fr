<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="bnlTruongNhapLieuList"
      :pagination="pagination"
      @edit="clickEdit($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="handleFilter"
      @changePageSize="getBieuNhapLieuTruongNhapLieuList({ pageSize: $event})"
      @changePage="getBieuNhapLieuTruongNhapLieuList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <BNLTruongNhapLieu
          v-if="dialog"
          :truongNhapLieu="bnlTNL"
          :formTitle="titleDialog"
          @close="closeDialog"
          @save="saveChiTieuDialog"
        />
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
import BNLTruongNhapLieu from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuTruongNhapLieu";

export default {
  components: {
    Table,
    BNLTruongNhapLieu
  },

  data() {
    return {
      title: "Biểu Nhập Liệu Trường Nhập Liệu",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      bnlTNL: {}
    };
  },

  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuTruongNhapLieu", [
      "bnlTruongNhapLieuList",
      "bnlTruongNhapLieu",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuTruongNhapLieu/getBieuNhapLieuTruongNhapLieuList"
    );
  },

  mounted() {
    this.getBieuNhapLieuTruongNhapLieuList();
    this.getBieuNhapLieuList();
    this.getTruongNhaplieuList();
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuTruongNhapLieu", [
      "getBieuNhapLieuTruongNhapLieuList",
      "getBieuNhapLieuTruongNhapLieu",
      "addBieuNhapLieuTruongNhapLieu",
      "updateBieuNhapLieuTruongNhapLieu",
      "deleteBieuNhapLieuTruongNhapLieu",
      "restoreBieuNhapLieuTruongNhapLieu"
    ]),
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getBieuNhapLieuList"]),
    ...mapActions("truongNhapLieu", ["getTruongNhaplieuList"]),

    clickAddNew() {
      this.dialog = true;
      this.titleDialog = "Thêm mới biểu nhập liệu trường nhập liệu";
      this.bnlTNL = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        truongNhapLieuId: 0,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getBieuNhapLieuTruongNhapLieu(Number(item.id));
      this.bnlTNL = Object.assign({}, this.bnlTruongNhapLieu);
      console.log("bnldsdhfd", this.bnlTNL);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
      // console.log("item", item)
    },

    async deleted(items) {
      console.log("item", items);
      await this.deleteBieuNhapLieuTruongNhapLieu(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.bnlTNL = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateBieuNhapLieuTruongNhapLieu(this.bnlTNL);
      } else {
        await this.addBieuNhapLieuTruongNhapLieu(this.bnlTNL);
      }
      this.closeDialog();
    },

    async handleFilter(value) {
      this.overlay = true;
      await this.getBieuNhapLieuTruongNhapLieuList({ queryData: value });
      this.overlay = false;
    }
  }
};
</script>