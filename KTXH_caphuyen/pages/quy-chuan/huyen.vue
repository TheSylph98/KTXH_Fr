<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="huyenList"
    :pagination="pagination"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getHuyenList({queryData: $event})"
    @changePageSize="changeList({ pageSize: $event})"
    @changePage="changeList({ page: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Huyen
        v-if="dialog"
        :huyen="huyen_data"
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
import Table from "../../components/table.vue";
import { mapState, mapActions } from "vuex";
import Huyen from "@/components/Dialog/QuyChuan/Huyen";

export default {
  components: {
    Table,
    Huyen
  },
  data() {
    return {
      title: "Khai Báo Quy Chuẩn: Huyện",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      huyen_data: {},
      headers: [
        {
          text: "Mã",
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
    ...mapState("quychuan/qcHuyen", ["huyenList", "huyen", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcHuyen/getHuyenList");
  },

  async created() {
    if (!this.huyenList.length) {
      this.overlay = true
      await this.getHuyenList()
      this.overlay = false
    }
  },

  async mounted() {
    await this.getTinhList()
  },

  methods: {
    ...mapActions("quychuan/qcHuyen", [
      "getHuyenList",
      "getHuyen",
      "addHuyen",
      "updateHuyen",
      "deleteHuyen",
      "restoreHuyen"
    ]),
    ...mapActions("quychuan/qcTinh", ["getTinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm huyện mới";
      this.huyen_data = {
        ma: "",
        ten: "",
        qcTinhId: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: false,
        bienGioi: false,
        haiDao: false,
        vungDBKhoKhan: false,
        ghiChu: "",
        hieuLuc: true
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getHuyen(Number(item.id))
      this.huyen_data = Object.assign({}, this.huyen)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteHuyen(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.huyen_data = {};
    },

    async saveChiTieuDialog() {
      if (this.isUpdate) {
        await this.updateHuyen(this.huyen_data);
      } else {
        await this.addHuyen(this.huyen_data);
      }
      this.closeDialog();
    },

    async changeList(value) {
      this.overlay = true;
      await this.getHuyenList(value);
      this.overlay = false;
    },
  }
};
</script>