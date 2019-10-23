<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuNhomList"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getChiTieuNhomList({queryData: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <ChiTieuNhom
        v-if="dialog"
        :chiTieuNhom="ctNhom"
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
      overlay: false,
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
      ctNhom: {}
    };
  },
  computed: {
    ...mapState("chitieu/chiTieuNhom", ["chiTieuNhomList", "chi_tieu_nhom", "pagination"])
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
      this.ctNhom = {
        ma: "",
        ten: "",
        ghiChu: ""
      };
    },
    async clickEdit(item) {
      this.overlay = true;
      await this.getChiTieuNhom(Number(item.id))
      this.ctNhom = Object.assign({}, this.chi_tieu_nhom)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteChiTieuNhom(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.ctNhom = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateChiTieuNhom(this.ctNhom);
      } else {
        await this.addChiTieuNhom(this.ctNhom);
      }
      this.closeDialog();
    }
  }
};
</script>