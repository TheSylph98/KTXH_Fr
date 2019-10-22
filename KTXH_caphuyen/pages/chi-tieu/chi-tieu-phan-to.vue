<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuPhanToList"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getChiTieuPhanToList({queryData: $event})"
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
  <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</div>
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
      overlay: false,
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
    ...mapState("chitieu/chiTieuPhanTo", ["chiTieuPhanToList", "chi_tieu_phan_to", "pagination"])
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

    async clickEdit(item) {
      this.overlay = true;
      await this.getChiTieuPhanTo(Number(item.id))
      this.chiTieuPhanTo = Object.assign({}, this.chi_tieu_phan_to)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteChiTieuPhanTo(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieuPhanTo = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateChiTieuPhanTo(this.chiTieuPhanTo);
      } else {
        await this.addChiTieuPhanTo(this.chiTieuPhanTo);
      }
      this.closeDialog();
    }
  }
};
</script>