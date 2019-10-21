<template>
  <Table
    :title="title"
    :headers="headers"
    :items="donViList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <DonVi
        v-if="dialog"
        :donVi="donVi"
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
import DonVi from "../../components/Dialog/Quantri/DonVi";

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
      titleDialog: "",
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
      ]
    };
  },

  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtDonVi/getQTDonViList");
  },

  created() {
    this.getQTDonViList();
  },

  methods: {
    ...mapActions("quantri/qtDonVi", [
      "getQTDonViList",
      "getQTDonVi",
      "addQTDonVi",
      "updateQTDonVi",
      "deleteQTDonVi",
      "restoreQTDonVi"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm đơn vị mới";
      this.donVi = {
        ma: "",
        ten: "",
        donViChaId: 0,
        diaChi: "",
        soDienThoai: "",
        email: "",
        ghiChu: "",
        laDonVi: false
      };
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
        this.updateBieuNhapLieuTruongDuLieu(this.truongNhapLieu);
      } else {
        this.addBieuNhapLieuTruongDuLieu(this.truongNhapLieu);
      }
      this.closeDialog();
    }
  }
};
</script>