<template>
  <Table
    :title="title"
    :headers="headers"
    :items="donViList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <DonVi :donVi="donVi" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog"/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import DonVi from "@/components/Dialog/DonVi"
export default {
  components: {
    Table,
    DonVi
  },
  data() {
    return {
      title: "Khai Báo Đơn Vị",
      dialog: false,
      isUpdate: false,
      donVi: {},
      titleDialog: '',
      headers: [
        {
          text: "Mã đơn vị",
          align: "center",
          divider: true,
          value: "ma",
          type: "string"
        },
        { text: "Tên đơn vị", align: "center", value: "ten", type: "string" },
        {
          text: "Số điện thoại",
          align: "center",
          value: "soDienThoai",
          type: "string"
        },
        { text: "Đơn vị cha", align: "center", value: "donViChaId", type: "" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      
    }
  },
  computed: {
    ...mapState("qtDonVi", ["donViList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("qtDonVi/getQTDonViList");
  },

  created() {
    this.getQTDonViList();
  },

  methods: {
    ...mapActions("qtDonVi", [
      "getQTDonViList",
      "getQTDonVi",
      "addQTDonVi",
      "updateQTDonVi",
      "deleteQTDonVi",
      "restoreQTDonVi"
    ]),
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    clickAddNew() {
      this.dialog = true;
      this.truongNhapLieu = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        truongNhapLieuId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },
    edit(item) {
      this.truongNhapLieu = this.bnlTruongDuLieuList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.bnlTruongDuLieuList.indexOf(item);
      confirm("Xác nhận xóa?") && this.bnlTruongDuLieuList.splice(index, 1);
      this.deleteBieuNhapLieuTruongDuLieu(this.truongNhapLieu);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.truongNhapLieu = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateBieuNhapLieuTruongDuLieu(this.truongNhapLieu)
      } else {
        this.addBieuNhapLieuTruongDuLieu(this.truongNhapLieu)
      }
      this.closeDialog();
    },
  }
};
</script>