<template>
  <Table
    :title="title"
    :headers="headers"
    :items="xaList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Xa :xa="xa" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog" />
    </v-dialog>
  </Table>
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
      titleDialog: "",
      xa: {},
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
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
    ...mapState("quychuan/qcXa", ["xaList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcXa/getXaList");
  },

  created() {
    this.getXaList();
    this.getHuyenList();
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
    ...mapActions("quychuan/huyen", ["getHuyenList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm xã mới";
      this.xa = {
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

    edit(item) {
      this.xa = this.xaList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.xaList.indexOf(item);
      confirm("Xác nhận xóa?") && this.xaList.splice(index, 1);
      this.deleteQCXa(this.xa);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.xa = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateQCXa(this.xa);
      } else {
        this.addQCXa(this.xa);
      }
      this.closeDialog();
    }
  }
};
</script>