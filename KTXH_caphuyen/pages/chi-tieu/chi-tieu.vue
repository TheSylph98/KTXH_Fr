<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="chiTieuList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      @edit="clickEdit($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getChiTieuList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <ChiTieu
          v-if="dialog"
          :chiTieu="chiTieu"
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
import ChiTieu from "@/components/Dialog/ChiTieu/ChiTieu";

export default {
  components: {
    Table,
    ChiTieu
  },
  data() {
    return {
      title: "Chỉ Tiêu Kinh Tế Xã Hội",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      chiTieu: {},
      headers: [
        {
          text: "Nhóm Chỉ Tiêu",
          align: "center",
          sorttable: false,
          value: "chiTieuNhomId",
          type: "string"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên chỉ tiêu",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Đơn vị tính",
          align: "center",
          sorttable: false,
          value: "donViTinh",
          type: "string"
        },
        {
          text: "Phân tổ",
          align: "center",
          sorttable: false,
          value: "chiTieuPhanToId",
          type: ""
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },
  computed: {
    ...mapState("chitieu/chiTieu", ["chiTieuList", "chi_tieu", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("chiTieu/getChiTieuList");
  },

  async created() {
    if (!this.chiTieuList.length) {
      this.overlay = true;
      await this.getChiTieuList();
      this.overlay = false;
    }
  },

  async mounted() {
    await Promise.all([
      this.getChiTieuNhomList(),
      this.getChiTieuPhanToList(),
      this.getCapHanhChinhList()
    ]);
  },

  methods: {
    ...mapActions("chitieu/chiTieu", [
      "getChiTieuList",
      "getChiTieu",
      "addChiTieu",
      "updateChiTieu",
      "deleteChiTieu",
      "restoreChiTieu"
    ]),
    ...mapActions("chitieu/chiTieuNhom", ["getChiTieuNhomList"]),
    ...mapActions("chitieu/chiTieuPhanTo", ["getChiTieuPhanToList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getCapHanhChinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.formTitle = "Thêm chỉ tiêu mới";
      this.chiTieu = {
        ma: "",
        ten: "",
        capNhapLieuId: 0,
        capTongHopId: 0,
        chiTieuNhomId: 0,
        chiTieuPhanToId: 0,
        chiTieuChaId: 0,
        congDonTuDuoiLen: true,
        congTheoMa: 0,
        congThucCong: "",
        coPhanToKhong: 1,
        donViTinh: "",
        tuSo: "",
        mauSo: "",
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getChiTieu(Number(item.id));
      this.chiTieu = Object.assign({}, this.chi_tieu);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteChiTieu(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa chỉ tiêu thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.chiTieu = {};
    },

    async saveChiTieuDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateChiTieu(this.chiTieu);
      } else {
        res = await this.addChiTieu(this.chiTieu);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật chỉ tiêu thành công"
          : "Thêm chỉ tiêu thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    async changeList(value) {
      this.overlay = true;
      await this.getChiTieuList(value);
      this.overlay = false;
    }
  }
};
</script>