<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="tinhList"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getTinhList({queryData: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Tinh v-if="dialog" :tinh="tinh_data" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog" />
    </v-dialog>
  </Table>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</div>
</template>

<script>
import Table from "../../components/table.vue";
import { mapState, mapActions } from "vuex";
import Tinh from "@/components/Dialog/QuyChuan/Tinh";
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
      overlay: false,
      titleDialog: "",
      tinh_data: {},
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
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
      ]
    };
  },
  computed: {
    ...mapState("quychuan/qcTinh", ["tinhList", "tinh", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcTinh/getTinhList");
  },
  created() {
    this.getTinhList();
  },

  methods: {
    ...mapActions("quychuan/qcTinh", [
      "getTinhList",
      "getTinh",
      "addTinh",
      "updateTinh",
      "deleteTinh",
      "restoreTinh"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm tỉnh mới";
      this.tinh_data = {
        ma: "",
        ten: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: true,
        bienGioi: false,
        haiDao: true,
        vungDBKhoKhan: false,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getTinh(Number(item.id))
      this.tinh_data = Object.assign({}, this.tinh)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteTinh(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.tinh_data = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateTinh(this.tinh_data);
      } else {
        await this.addTinh(this.tinh_data);
      }
      this.closeDialog();
    },
  }
};
</script>