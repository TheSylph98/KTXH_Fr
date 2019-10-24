<template>
<div>
  <Table
    :title="title"
    :headers="headers"
    :items="tacNhanList"
    :pagination="pagination"
    @edit="clickEdit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
    @filter="getTacNhanList({queryData: $event})"
    @changePageSize="changeList({ pageSize: $event})"
    @changePage="changeList({ page: $event})"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <TacNhan
        v-if="dialog"
        :tacNhan="tN"
        :formTitle="titleDialog"
        @close="closeDialog"
        @save="saveTacNhanDialog"
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
import TacNhan from "@/components/Dialog/Quantri/TacNhan";

export default {
  components: {
    Table,
    TacNhan
  },
  data() {
    return {
      title: "Khai báo tác nhân",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      tN: {},
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
      ]
    };
  },
  computed: {
    ...mapState("quantri/qtTacNhan", ["tacNhanList", "tacNhan", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtTacNhan/getTacNhanList");
  },

  async created() {
    if (!this.tacNhanList.length) {
      this.overlay = true
      await this.getTacNhanList()
      this.overlay = false
    }
  },

  methods: {
    ...mapActions("quantri/qtTacNhan", [
      "getTacNhanList",
      "getQTTacNhan",
      "addQTTacNhan",
      "updateQTTacNhan",
      "deleteQTTacNhan",
      "restoreQTTacNhan"
    ]),
    ...mapActions("sys/sysCapHanhChinh", ["getCapHanhChinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.tN = {
        ma: "",
        ten: "",
        sysCapHanhChinhId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getQTTacNhan(Number(item.id))
      this.tN = Object.assign({}, this.tacNhan)
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      await this.deleteQTTacNhan(items.map(e => e.id));
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.tN = {};
    },

    async saveTacNhanDialog() {
      if (this.isUpdate) {
        await this.updateQTTacNhan(this.tN);
      } else {
        await this.addQTTacNhan(this.tN);
      }
      this.closeDialog();
    },

    async changeList(value) {
      this.overlay = true;
      await this.getTacNhanList(value);
      this.overlay = false;
    },

  }
};
</script>