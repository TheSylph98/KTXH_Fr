<template>
  <Table
    :title="title"
    :headers="headers"
    :items="huyenList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <Huyen
        v-if="dialog"
        :huyen="huyen"
        :formTitle="titleDialog"
        @close="closeDialog"
        @save="saveChiTieuDialog"
      />
    </v-dialog>
  </Table>
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
      titleDialog: "",
      huyen: {},
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
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
    ...mapState("quychuan/qcHuyen", ["huyenList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcHuyen/getHuyenList");
  },

  created() {
    this.getHuyenList();
    //this.getTinhList()
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
    ...mapActions("quychuan/tinh", ["getTinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm huyện mới";
      this.huyen = {
        ma: "",
        ten: "",
        qcTinhId: "",
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
      this.huyen = this.huyenList.indexOf(item);
      this.dialog = true;
      this.isUpdate = true;
    },
    deleted(item) {
      const index = this.huyenList.indexOf(item);
      confirm("Xác nhận xóa?") && this.huyenList.splice(index, 1);
      this.deleteQCHuyen(this.huyen);
    },
    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.huyen = {};
    },
    saveChiTieuDialog() {
      if (this.isUpdate) {
        this.updateQCHuyen(this.huyen);
      } else {
        this.addQCHuyen(this.huyen);
      }
      this.closeDialog();
    }
  }
};
</script>