<template>
  <Table
    :title="title"
    :headers="headers"
    :items="bnlTruongNhapLieuList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <BNLTruongNhapLieu
        v-if="dialog"
        :truongNhapLieu="bnlTruongNhapLieu"
        :formTitle="titleDialog"
        @close="closeDialog"
        @save="saveChiTieuDialog"
      />
    </v-dialog>
  </Table>
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
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      bnlTruongNhapLieu: {}
    };
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuTruongNhapLieu", [
      "bnlTruongNhapLieuList",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuTruongNhapLieu/getBieuNhapLieuTruongNhapLieuList"
    );
  },

  created() {
    this.getBieuNhapLieuTruongNhapLieuList();
    // this.getBieuNhapLieuList();
    // this.getTruongNhaplieuList();
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
      this.bnlTruongNhapLieu  = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        truongNhapLieuId: 0,
        ghiChu: ""
      };
    },
    edit(item) {
      this.dialog = true;
      this.isUpdate = true;
      this.bnlTruongNhapLieu = this.bnlTruongNhapLieuList.indexOf(item);
    },

    async deleted(items) {
      console.log("item", items)
      await this.deleteBieuNhapLieuTruongNhapLieu(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.bnlTruongNhapLieu = {};
    },
    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateBieuNhapLieuTruongNhapLieu(this.bnlTruongNhapLieu);
      } else {
        await this.addBieuNhapLieuTruongNhapLieu(this.bnlTruongNhapLieu);
      }
      this.closeDialog();
    }
  }
};
</script>