<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="bnlTruongNhapLieuList"
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
      @delete="handleDeleted($event)"
      @clickAdd="clickAddNew"
      @filter="changeList({ queryData: $event })"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <BNLTruongNhapLieu
          v-if="dialog"
          :truongNhapLieu="bnlTNL"
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
import BNLTruongNhapLieu from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuTruongNhapLieu";
// import { Promise } from "lodash"

export default {
  components: {
    Table,
    BNLTruongNhapLieu
  },

  data() {
    return {
      title: "Biểu Nhập Liệu Trường Nhập Liệu",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      headers: [
        {
          text: "Kí hiệu",
          align: "center",
          value: "ma",
          type: "string",
          width: "8.5%"
        },
        {
          text: "Tên biểu",
          align: "center",
          value: "ten",
          type: "string",
          width: "29.75%"
        },
        {
          text: "Ghi chú",
          align: "center",
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
      bnlTNL: {},
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuTruongNhapLieu", [
      "bnlTruongNhapLieuList",
      "bnlTruongNhapLieu",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuTruongNhapLieu/getBieuNhapLieuTruongNhapLieuList"
    );
  },

  async created() {
    if (!this.bnlTruongNhapLieuList.length) {
      this.overlay = true;
      await this.getBieuNhapLieuTruongNhapLieuList();
      this.overlay = false;
    }
  },

  async mounted() {
    await Promise.all([
      this.getBieuNhapLieuList(),
      this.getTruongNhaplieuList()
    ]);
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuTruongNhapLieu", [
      "getBieuNhapLieuTruongNhapLieuList",
      "getBieuNhapLieuTruongNhapLieu",
      "addBieuNhapLieuTruongNhapLieu",
      "updateBieuNhapLieuTruongNhapLieu",
      "deleteBieuNhapLieuTruongNhapLieu",
      "restoreBieuNhapLieuTruongNhapLieu"
    ]),
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getBieuNhapLieuList"]),
    ...mapActions("truongNhapLieu", ["getTruongNhaplieuList"]),

    clickAddNew() {
      this.dialog = true;
      this.titleDialog = "Thêm mới biểu nhập liệu trường nhập liệu";
      this.bnlTNL = {
        ma: null,
        ten: null,
        bieuNhapLieuId: null,
        truongNhapLieuId: null,
        ghiChu: null
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa biểu nhập liệu trường nhập liệu";
      await this.getBieuNhapLieuTruongNhapLieu(Number(item.id));
      this.bnlTNL = Object.assign({}, this.bnlTruongNhapLieu);
      console.log("bnldsdhfd", this.bnlTNL);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async handleDeleted(items) {
      const { isSuccess } = await this.deleteBieuNhapLieuTruongNhapLieu(
        items.map(e => e.id)
      );

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa trường nhập liệu thành công!";
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
      this.bnlTNL = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;
      if (this.isUpdate) {
        res = await this.updateBieuNhapLieuTruongNhapLieu(this.bnlTNL);
      } else {
        res = await this.addBieuNhapLieuTruongNhapLieu(this.bnlTNL);

        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật trường nhập liệu thành công"
          : "Thêm trường nhập liệu thành công!";
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
      await this.getBieuNhapLieuTruongNhapLieuList(value);
      this.overlay = false;
    }
  }
};
</script>