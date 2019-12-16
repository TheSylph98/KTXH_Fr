<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="bnlKyBaoCaoList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      :tableWidth="{
        'checkbox': '2.25%',
        'index': '4.25%',
        'action': '8.5%'
      }"
      @edit="clickEdit($event)"
      @watch="clickWatch($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="changeList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <BNLKyBaoCao
          v-if="dialog"
          :kyBaoCao="kyBaoCao"
          :formTitle="titleDialog"
          :isWatch="isWatch"
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
import BNLKyBaoCao from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuKyBaoCao";

export default {
  components: {
    Table,
    BNLKyBaoCao
  },
  data() {
    return {
      title: "Biểu nhập liệu kỳ báo cáo",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      headers: [
        {
          text: "Kí hiệu",
          align: "left",
          value: "ma",
          type: "string",
          width: "18.5%"
        },
        {
          text: "Tên ",
          align: "left",
          value: "ten",
          type: "string",
          width: "29.75%"
        },
        {
          text: "Ghi chú",
          align: "left",
          value: "ghiChu",
          type: "string",
          width: "38.25%"
        },
        {
          text: "Hiệu lực",
          align: "center",
          value: "hieuLuc",
          type: "",
          width: "8.5%"
        }
      ],
      kyBaoCao: {},
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuKyBaoCao", [
      "bnlKyBaoCaoList",
      "bnlKyBaoCao",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuKyBaoCao/getBieuNhapLieuKyBaoCaoList"
    );
  },

  async created() {
    if (!this.bnlKyBaoCaoList.length) {
      this.overlay = true;
      await this.getBieuNhapLieuKyBaoCaoList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuKyBaoCao", [
      "getBieuNhapLieuKyBaoCaoList",
      "getBieuNhapLieuKyBaoCao",
      "addBieuNhapLieuKyBaoCao",
      "updateBieuNhapLieuKyBaoCao",
      "deleteBieuNhapLieuKyBaoCao",
      "restoreBieuNhapLieuKyBaoCao"
    ]),
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getBieuNhapLieuList"]),
    ...mapActions("quanly/qlKyBaoCao", ["getKyBaoCaoList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm Mới Biểu Nhập Liệu Kỳ Báo Cáo";
      this.kyBaoCao = {
        ma: null,
        ten: null,
        bieuNhapLieuId: null,
        qlKyBaoCaoId: null,
        ghiChu: ""
      };
    },
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem biểu nhập liệu kỳ báo cáo";
      await this.getBieuNhapLieuKyBaoCao(Number(item.id));
      this.kyBaoCao = Object.assign({}, this.bnlKyBaoCao);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa biểu nhập liệu kỳ báo cáo";
      await this.getBieuNhapLieuKyBaoCao(Number(item.id));
      this.kyBaoCao = Object.assign({}, this.bnlKyBaoCao);
      this.isWatch = true;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteBieuNhapLieuKyBaoCao(
        items.map(e => e.id)
      );

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa kỳ báo cáo thành công!";
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
      this.isWatch = true;
      this.kyBaoCao = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateBieuNhapLieuKyBaoCao(this.kyBaoCao);
        this.closeDialog();
      } else {
        res = await this.addBieuNhapLieuKyBaoCao(this.kyBaoCao);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật kỳ báo cáo thành công"
          : "Thêm kỳ báo cáo thành công!";
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
      value.page = value.page !== undefined ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getBieuNhapLieuKyBaoCaoList(value);
      this.overlay = false;
    }
  }
};
</script>