<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tinhList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <Tinh/>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "../../components/table.vue";
import { mapState, mapActions } from "vuex";
import Tinh from "@/components/Dialog/Tinh"
export default {
  components: {
    Table,
    Tinh
  },
  data() {
    return {
      title: "Khai Báo Từ Điển: Tỉnh",
      dialog: false,
      isUpdate: false,
      titleDialog: '',
      tinh: {},
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttable: true,
          value: "ma",
          typr: "string"
        },
        {
          text: "Tên",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi Chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          type: ""
        }
      ],
      
    }
  },
  computed: {
    ...mapState("qcTinh", ["tinhList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("qcTinh/getQCTinhList");
  },

  created() {
    this.getQCTinhList();
  },

  methods: {
    ...mapActions("qcTinh", [
      "getQCTinhList",
      "getQCTinh",
      "addQCTinh",
      "updateQCTinh",
      "deleteQCTinh",
      "restoreQCTinh"
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