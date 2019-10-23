<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="donViList"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getQTDonViList({queryData: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <DonVi
        v-if="dialog"
        :donVi="dv"
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
      overlay: false,
      dv: {},
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
        { text: "Đơn vị cha", align: "center", value: "belongsToQTDonVi.ten", type: "" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ]
    };
  },

  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "donVi", "pagination"])
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
      this.dv = {
        ma: "",
        ten: "",
        diaChi: "",
        soDienThoai: "",
        donViChaId: 0,
        email: "",
        ghiChu: "",
        laDonVi: false
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getQTDonVi(Number(item.id))
      this.dv = Object.assign({}, this.donVi)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteQTDonVi(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.dv = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateQTDonVi(this.dv);
      } else {
        await this.addQTDonVi(this.dv);
      }
      this.closeDialog();
    },
  }
};
</script>