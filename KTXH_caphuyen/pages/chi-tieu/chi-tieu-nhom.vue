<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuNhomList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <ChiTieuNhom
        v-if="dialog"
        :chiTieuNhom="chiTieuNhom"
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
import ChiTieuNhom from "@/components/Dialog/ChiTieu/ChiTieuNhom";

export default {
  components: {
    Table,
    ChiTieuNhom
  },
  data() {
    return {
      title: "Khai Báo Nhóm Chỉ Tiêu",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên nhóm chỉ tiêu KTXH",
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
      chiTieuNhomNhom: {}
    };
  },
  computed: {
    ...mapState("chitieu/chiTieuNhom", ["chiTieuNhomList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuNhom/getChiTieuNhomList");
  },

  created() {
    this.getChiTieuNhomList();
  },

  methods: {
    ...mapActions("chitieu/chiTieuNhom", [
      "getChiTieuNhomList",
      "getChiTieuNhom",
      "addChiTieuNhom",
      "updateChiTieuNhom",
      "deleteChiTieuNhom",
      "restoreChiTieuNhom"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.titleDialog = "Thêm chỉ tiêu nhóm mới";
      this.chiTieuNhom = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        qlKyBaoCaoId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },
    edit(item) {
      this.chiTieuNhom = this.chiTieuNhomList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },

    deleted(item) {
      const index = this.chiTieuNhomList.indexOf(item);
      confirm("Xác nhận xóa?") && this.chiTieuNhomList.splice(index, 1);
      this.deleteChiTieuNhom(this.chiTieuNhom);
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieuNhom = {};
    },

    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateChiTieuNhom(this.chiTieuNhom);
      } else {
        this.addChiTieuNhom(this.chiTieuNhom);
      }
      this.closeDialog();
    }
  }
};
</script>