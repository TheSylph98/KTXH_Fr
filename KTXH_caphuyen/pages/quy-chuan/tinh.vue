<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tinhList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Tinh :tinh="tinh" :formTitle="titleDialog" @close="closeDialog" @save="saveChiTieuDialog" />
    </v-dialog>
  </Table>
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
      titleDialog: "",
      tinh: {},
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttable: true,
          value: "ma",
          typr: "string"
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
    ...mapState("quychuan/qcTinh", ["tinhList", "pagination"])
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
      this.tinh = {
        ma: "",
        ten: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: 1,
        bienGioi: 0,
        haiDao: 0,
        vungDBKhoKhan: 0,
        ghiChu: ""
      };
    },

    edit(item) {
      this.tinh = this.tinhList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.tinhList.indexOf(item);
      confirm("Xác nhận xóa?") && this.tinhList.splice(index, 1);
      this.deleteQCTinh(this.tinh);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.tinh = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateQCTinh(this.tinh);
      } else {
        this.addQCTinh(this.tinh);
      }
      this.closeDialog();
    }
  }
};
</script>