<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="xaList"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getXaList({queryData: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Xa v-if="dialog" :xa="xa_data" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog" />
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
import Xa from "@/components/Dialog/QuyChuan/Xa";

export default {
  components: {
    Table,
    Xa
  },
  data() {
    return {
      title: "Khai Báo Từ Điển: Xã",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      xa_data: {},
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
    ...mapState("quychuan/qcXa", ["xaList", "xa", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcXa/getXaList");
  },

  created() {
    this.getXaList();
    //this.getHuyenList();
  },

  methods: {
    ...mapActions("quychuan/qcXa", [
      "getXaList",
      "getXa",
      "addXa",
      "updateXa",
      "deleteXa",
      "restoreXa"
    ]),
    ...mapActions("quychuan/qcHuyen", ["getHuyenList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm xã mới";
      this.xa_data = {
        ma: "",
        ten: "",
        qcHuyenId: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: 1,
        bienGioi: 0,
        haiDao: 0,
        vungDBKhoKhan: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getXa(Number(item.id))
      this.xa_data = Object.assign({}, this.xa)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteXa(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.xa_data = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateXa(this.xa_data);
      } else {
        await this.addXa(this.xa_data);
      }
      this.closeDialog();
    },
  }
};
</script>