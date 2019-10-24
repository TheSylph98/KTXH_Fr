<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="bnlKyBaoCaoList"
    :pagination="pagination"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getBieuNhapLieuKyBaoCaoList({queryData: $event})"
    @changePageSize="changeList({ pageSize: $event})"
    @changePage="changeList({ page: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <BNLKyBaoCao
        v-if="dialog"
        :kyBaoCao="kyBaoCao"
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
import BNLKyBaoCao from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuKyBaoCao";

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
      overlay: false,
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      kyBaoCao: {}
    };
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuKyBaoCao", [
      "bnlKyBaoCaoList",
      "bnlKyBaoCao",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuKyBaoCao/getBieuNhapLieuKyBaoCaoList"
    );
  },

  async created() {
    if (!this.bnlKyBaoCaoList.length) {
      this.overlay = true
      await this.getBieuNhapLieukyBaoCaoList()
      this.overlay = false
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuKyBaoCao", [
      "getBieuNhapLieuKyBaoCaoList",
      "getBieuNhapLieuKyBaoCao",
      "addBieuNhapLieuKyBaoCao",
      "updateBieuNhapLieuKyBaoCao",
      "deleteBieuNhapLieuKyBaoCao",
      "restoreBieuNhapLieuKyBaoCao"
    ]),
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getBieuNhapLieuList"]),
    ...mapActions("quanly/qlKyBaoCao", ["getKyBaoCaoList"]),

    clickAddNew() {
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
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getBieuNhapLieuKyBaoCao(Number(item.id))
      this.kyBaoCao = Object.assign({}, this.bnlKyBaoCao)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      console.log("item", items)
      await this.deleteBieuNhapLieuKyBaoCao(items.map(e => e.id));
    },
    
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.kyBaoCao = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateBieuNhapLieuKyBaoCao(this.kyBaoCao);
      } else {
        await this.addBieuNhapLieuKyBaoCao(this.kyBaoCao);
      }
      this.closeDialog();
    },

    async changeList(value) {
      this.overlay = true;
      await this.getBieuNhapLieukyBaoCaoList(value);
      this.overlay = false;
    },
  }
};
</script>