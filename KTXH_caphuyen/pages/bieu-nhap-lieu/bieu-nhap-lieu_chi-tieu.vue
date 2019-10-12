<template>
  <Table
    :title="title"
    :headers="headers"
    :items="bnlChiTieuList"
    @edit="clickUpdateDialog($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <BieuNhapLieuChiTieu
        :chiTieu="chiTieu"
        :formTitle="titleDialog"
        @close="closeDialog"
        @save="saveChiTieuDialog"
      />
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import BieuNhapLieuChiTieu from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuChiTieu";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    BieuNhapLieuChiTieu
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      chiTieu: {}
    };
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuChiTieu", [
      "bnlChiTieuList",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuChiTieu/getBieuNhapLieuChiTieuList"
    );
  },

  created() {
    this.getBieuNhapLieuChiTieuList();
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuChiTieu", [
      "getBieuNhapLieuChiTieuList",
      "getBieuNhapLieuChiTieu",
      "addBieuNhapLieuChiTieu",
      "updateBieuNhapLieuChiTieu",
      "deleteBieuNhapLieuChiTieu",
      "restoreBieuNhapLieuChiTieu"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm chỉ tiêu mới";
      this.chiTieu = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        chiTieuId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    clickUpdateDialog() {
      this.dialog = true;
      this.isUpdate = true;
      this.titleDialog = "Cập nhật chỉ tiêu";
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieu = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateBieuNhapLieuChiTieu(this.chiTieu);
      } else {
        await this.addBieuNhapLieuChiTieu(this.chiTieu);
      }

      this.closeDialog();
    },

    async deleted(item) {
      const index = this.bnlChiTieuList.indexOf(item);
      confirm("Xác nhận xóa?") && this.bnlChiTieuList.splice(index, 1);
      await this.deleteBieuNhapLieuChiTieu(this.chiTieu);
    }
    // edit(item) {
    //   this.dialog = true;
    //   this.isUpdate = true;
    //   this.titleDialog = "Chỉnh Sửa Biểu Nhập Liệu Kỳ Báo Cáo";
    //   this.kyBaoCao = this.bnlKyBaoCaoList.indexOf(item);
    // },

    // delete(tiem) {
    //   const index = this.items.indexOf(item);
    //   confirm("Xác nhận xóa?") && this.items.splice(index, 1);
    //   this.deleteBieuNhapLieuChiTieu(this.editedItem);
    // },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.items[this.editedIndex], this.editedItem);
    //   } else {
    //     this.items.push(this.editedItem);
    //   }
    //   this.close();
    // },

    // close() {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // }
  }
};
</script>