<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tacNhanList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <TacNhan :tacNhan="tacNhan" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog"/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import TacNhan from "@/components/Dialog/TacNhan"

export default {
  components: {
    Table,
    TacNhan
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      isUpdate: false,
      titleDialog: '',
      tacNhan: {},
      headers: [
        {
          text: "Tên tác nhân",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Cấp hành chính",
          align: "center",
          sorttable: false,
          value: "sysCapHanhChinhId",
          type: ""
        },
        {
          text: "Chức năng, nhiệm vụ",
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
    ...mapState("qtTacNhan", ["tacNhanList", "pagination"]),
    // formTitle() {
    //   return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    // }
  },

  asyncData({ store }) {
    store.dispatch("qtTacNhan/getQTTacNhanList");
  },

  created() {
    this.getQTTacNhanList();
  },

  methods: {
    ...mapActions("qtTacNhan", [
      "getQTTacNhanList",
      "getQTTacNhan",
      "addQTTacNhan",
      "updateQTTacNhan",
      "deleteQTTacNhan",
      "restoreQTTacNhan"
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