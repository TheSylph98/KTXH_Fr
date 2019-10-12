<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="1000px">
      <ChiTieu :chiTieu="chiTieu" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog"/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import ChiTieu from "@/components/Dialog/ChiTieu"

export default {
  components: {
    Table,
    ChiTieu
  },
  data() {
    return {
      title: "Chỉ Tiêu Kinh Tế Xã Hội",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      chiTieu: {},
      caccap: ["cấp tỉnh", "cấp huyện", "cấp xã"],
      headers: [
        {
          text: "Nhóm Chỉ Tiêu",
          align: "center",
          sorttable: false,
          value: "chiTieuNhomId",
          type: "string"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên chỉ tiêu",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Đơn vị tính",
          align: "center",
          sorttable: false,
          value: "donViTinh",
          type: "string"
        },
        {
          text: "Phân tổ",
          align: "center",
          sorttable: false,
          value: "chiTieuPhanToId",
          type: ""
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      
    }
  },
  computed: {
    ...mapState("chiTieu", ["chiTieuList", "pagination"]),
  },

  asyncData({ store }) {
    store.dispatch("chiTieu/getChiTieuList");
  },

  created() {
    this.getChiTieuList();
  },

  methods: {
    ...mapActions("chiTieu", [
      "getChiTieuList",
      "getChiTieu",
      "addChiTieu",
      "updateChiTieu",
      "deleteChiTieu",
      "restoreChiTieu"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.formTitle = "Thêm chỉ tiêu mới"
      this.chiTieu = {
        ma: "",
        ten: "",
        capNhapLieuId: 0,
        capTongHopId: 0,
        chiTieuNhomId: 0,
        chiTieuPhanToId: 0,
        chiTieuChaId: 0,
        congDonTuDuoiLen: true,
        congTheoMa: 0,
        congThucCong: "",
        coPhanToKhong: 1,
        donViTinh: "",
        tuSo: "",
        mauSo: "",
        ghiChu: "",
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