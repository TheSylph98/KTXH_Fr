<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tacNhanList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <TacNhan
        :tacNhan="tacNhan"
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
import TacNhan from "@/components/Dialog/Quantri/TacNhan";

export default {
  components: {
    Table,
    TacNhan
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      tacNhan: {},
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
    ...mapState("quantri/qtTacNhan", ["tacNhanList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtTacNhan/getQTTacNhanList");
  },

  created() {
    this.getQTTacNhanList();
  },

  methods: {
    ...mapActions("quantri/qtTacNhan", [
      "getQTTacNhanList",
      "getQTTacNhan",
      "addQTTacNhan",
      "updateQTTacNhan",
      "deleteQTTacNhan",
      "restoreQTTacNhan"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.tacNhan = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        tacNhanId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },
    edit(item) {
      this.tacNhan = this.tacNhanList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.tacNhanList.indexOf(item);
      confirm("Xác nhận xóa?") && this.tacNhanList.splice(index, 1);
      this.deleteQTTacNhan(this.tacNhan);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.tacNhan = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateQTTacNhan(this.tacNhan);
      } else {
        this.addQTTacNhan(this.tacNhan);
      }
      this.closeDialog();
    }
  }
};
</script>