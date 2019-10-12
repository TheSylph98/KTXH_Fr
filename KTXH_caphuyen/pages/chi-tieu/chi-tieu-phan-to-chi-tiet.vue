<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuPhanToChiTietList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <ChiTieuPhanToChiTiet
        :chiTieuPhanToChiTiet="chiTieuPhanToChiTiet"
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
import ChiTieuPhanToChiTiet from "@/components/Dialog/ChiTieu/ChiTieuPhanToChiTiet";

export default {
  components: {
    Table,
    ChiTieuPhanToChiTiet
  },
  data() {
    return {
      title: "Chỉ Tiêu Phân Tổ Chi Tiết",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      chiTieuPhanToChiTiet: {},
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
          text: "Nội dung",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string"
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ]
    };
  },
  computed: {
    ...mapState("chitieu/chiTieuPhanToChiTiet", [
      "chiTieuPhanToChiTietList",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuPhanToChiTiet/getChiTieuPhanToChiTietList");
  },

  created() {
    this.getChiTieuPhanToChiTietList();
  },

  methods: {
    ...mapActions("chitieu/chiTieuPhanToChiTiet", [
      "getChiTieuPhanToChiTietList",
      "getChiTieuPhanToChiTiet",
      "addChiTieuPhanToChiTiet",
      "updateChiTieuPhanToChiTiet",
      "deleteChiTieuPhanToChiTiet",
      "restoreChiTieuPhanToChiTiet"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm mới chỉ tiêu phân tổ chi tiết";
      this.chiTieuPhanToChiTiet = {
        ma: "",
        ten: "",
        chiTieuPhanToId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },
    edit(item) {
      this.chiTieuPhanToChiTiet = this.chiTieuPhanToChiTietListList.indexOf(
        item
      );
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.chiTieuPhanToChiTietListList.indexOf(item);
      confirm("Xác nhận xóa?") &&
        this.chiTieuPhanToChiTietListList.splice(index, 1);
      this.deleteChiTieuPhanToChiTiet(this.chiTieuPhanToChiTiet);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieuPhanToChiTiet = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateChiTieuPhanToChiTiet(this.chiTieuPhanToChiTiet);
      } else {
        this.addChiTieuPhanToChiTiet(this.chiTieuPhanToChiTiet);
      }
      this.closeDialog();
    }
  }
};
</script>