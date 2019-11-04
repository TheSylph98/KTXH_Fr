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
      :tableWidth="{
        checkbox: '2.25%',
        index: '4.25%',
        action: '8.5%'
      }"
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
          :isUpdate="isUpdate"
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
          value: "belongsToChiTieuNhom.ten",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Tên chỉ tiêu",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string",
          width: "29.75%"
        },
        {
          text: "Đơn vị tính",
          align: "center",
          sorttable: false,
          value: "donViTinh",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Phân tổ",
          align: "center",
          sorttable: false,
          value: "belongsToChiTieuPhanTo.ten",
          type: "",
          width: "12.75%"
        },
        {
          text: "Loại",
          align: "center",
          sorttable: false,
          value: "",
          type: "",
          width: "8.5%"
        },
        {
          text: "Hiệu lực",
          align: "center",
          value: "hieuLuc",
          type: "",
          width: "8.5%"
        }
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
      this.isUpdate = false;
      this.formTitle = "Thêm chỉ tiêu mới";
      this.chiTieu = {
        ma: null,
        ten: null,
        capNhapLieuId: null,
        capTongHopId: null,
        chiTieuNhomId: null,
        chiTieuPhanToId: null,
        chiTieuChaId: 0,
        congDonTuDuoiLen: true,
        congTheoMa: false,
        congThucCong: "",
        coPhanToKhong: true,
        donViTinh: "",
        tuSo: "",
        mauSo: "",
        tinhPhanTram: false,
        ghiChu: ""
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa chỉ tiêu";
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
      this.titleDialog = "";
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
      value.pageSize = value.pageSize
        ? value.pageSize
        : this.pagination.pageSize;
      value.page = value.page ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getChiTieuList(value);
      this.overlay = false;
    }
  }
};
</script>