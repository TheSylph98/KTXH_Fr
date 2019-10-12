<template>
  <Table
    :title="title"
    :headers="headers"
    :items="bnlKyBaoCaoList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <BNLKyBaoCao :kyBaoCao="kyBaoCao" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog"/>
    </v-dialog>
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
      isUpdate: false,
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      kyBaoCao: {},
      // defaultItem: {
      //   ma: "",
      //   ten: "",
      //   bieuNhapLieuId: 0,
      //   qlKyBaoCaoId: 0,
      //   ghiChu: "",
      //   hieuLuc: 1,
      //   xoa: 0
      // }
    };
  },
  computed: {
    ...mapState("bieuNhapLieuKyBaoCao", ["bnlKyBaoCaoList", "pagination"]),
  },

  asyncData({ store }) {
    store.dispatch("bieuNhapLieuKyBaoCao/getBieuNhapLieuKyBaoCaoList");
  },

  created() {
    this.getBieuNhapLieuKyBaoCaoList();
    //console.log(this.getBieuNhapLieuKyBaoCaoList())

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
    clickAddNew() {
      //console.log(bnlKyBaoCaoList);
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm Mới Biểu Nhập Liệu Kỳ Báo Cáo";
      this.kyBaoCao = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        qlKyBaoCaoId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },
    edit(item) {
      this.dialog = true;
      this.isUpdate = true;
      this.titleDialog = "Chỉnh Sửa Biểu Nhập Liệu Kỳ Báo Cáo";
      this.kyBaoCao = this.bnlKyBaoCaoList.indexOf(item);
    },
    async deleted(item) {
      const index = this.bnlKyBaoCaoList.indexOf(item);
      confirm("Xác nhận xóa?") && this.bnlKyBaoCaoList.splice(index, 1);
      await this.deleteBieuNhapLieuKyBaoCao(this.kyBaoCao);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.kyBaoCao = {};
    },
    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateBieuNhapLieuKyBaoCao(this.kyBaoCao)
      } else {
        await this.addBieuNhapLieuKyBaoCao(this.kyBaoCao)
      }
      this.closeDialog();
    },

  }
};
</script>