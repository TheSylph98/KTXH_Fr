<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuPhanToList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <ChiTieuPhanTo
        v-if="dialog"
        :chiTieuPhanTo="chiTieuPhanTo"
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
import ChiTieuPhanTo from "@/components/Dialog/ChiTieu/ChiTieuPhanTo";

export default {
  components: {
    Table,
    ChiTieuPhanTo
  },
  data() {
    return {
      title: "Nhóm Chỉ Tiêu Phân Tổ",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      chiTieuPhanTo: {},
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Nội Dung",
          align: "center",
          sorttable: false,
          value: "noiDung",
          type: "string"
        },
        {
          text: "Ghi chú",
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
      ]
    };
  },

  computed: {
    ...mapState("chitieu/chiTieuPhanTo", ["chiTieuPhanToList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("chitieu/chiTieuPhanTo/getChiTieuPhanToList");
  },

  created() {
    this.getChiTieuPhanToList();
  },

  methods: {
    ...mapActions("chitieu/chiTieuPhanTo", [
      "getChiTieuPhanToList",
      "getChiTieuPhanTo",
      "addChiTieuPhanTo",
      "updateChiTieuPhanTo",
      "deleteChiTieuPhanTo",
      "restoreChiTieuPhanTo"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm chỉ tiêu phân tổ mới";
      this.chiTieuPhanTo = {
        ma: "",
        ten: "",
        ghiChu: ""
      };
    },

    edit(item) {
      this.chiTieuPhanTo = this.chiTieuPhanToListList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.chiTieuPhanToListList.indexOf(item);
      confirm("Xác nhận xóa?") && this.chiTieuPhanToListList.splice(index, 1);
      this.deleteChiTieuPhanTo(this.chiTieuPhanTo);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieuPhanTo = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateChiTieuPhanTo(this.chiTieuPhanTo);
      } else {
        this.addChiTieuPhanTo(this.chiTieuPhanTo);
      }
      this.closeDialog();
    }
  }
};
</script>