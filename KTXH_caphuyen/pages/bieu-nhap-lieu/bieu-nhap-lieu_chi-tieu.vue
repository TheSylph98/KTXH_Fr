<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="bnlChiTieuList"
      :pagination="pagination"
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      @edit="clickEdit($event)"
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getBieuNhapLieuChiTieuList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <BieuNhapLieuChiTieu
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
import BieuNhapLieuChiTieu from "@/components/Dialog/BieuNhapLieu/BieuNhapLieuChiTieu";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    BieuNhapLieuChiTieu
  },
  data() {
    return {
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      isUpdate: false,
      overlay: false,
      titleDialog: "",
      headers: [
        { text: "Kí hiệu", align: "center", value: "ma", type: "string" },
        { text: "Tên biểu", align: "center", value: "ten", type: "string" },
        { text: "Ghi chú", align: "center", value: "ghiChu", type: "string" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      chiTieu: {},
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieuChiTieu", [
      "bnlChiTieuList",
      "bnlChiTieu",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "bieunhaplieu/bieuNhapLieuChiTieu/getBieuNhapLieuChiTieuList"
    );
  },

  async created() {
    if (!this.bnlChiTieuList.length) {
      this.overlay = true;
      await this.getBieuNhapLieuChiTieuList();
      this.overlay = false;
    }
  },

  async mounted() {
    await Promise.all([this.getBieuNhapLieuList(), this.getChiTieuList()]);
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieuChiTieu", [
      "getBieuNhapLieuChiTieuList",
      "getBieuNhapLieuChiTieu",
      "addBieuNhapLieuChiTieu",
      "updateBieuNhapLieuChiTieu",
      "deleteBieuNhapLieuChiTieu",
      "restoreBieuNhapLieuChiTieu"
    ]),
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getBieuNhapLieuList"]),
    ...mapActions("chitieu/chiTieu", ["getChiTieuList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm biểu nhập liệu chi tiêu mới";
      this.chiTieu = {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        chiTieuId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    async clickEdit(item) {
      this.overlay = true;
      await this.getBieuNhapLieuChiTieu(Number(item.id));
      this.chiTieu = Object.assign({}, this.bnlChiTieu);
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteBieuNhapLieuChiTieu(
        items.map(e => e.id)
      );

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
        res = await this.updateBieuNhapLieuChiTieu(this.chiTieu);
      } else {
        res = await this.addBieuNhapLieuChiTieu(this.chiTieu);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật chie tiêu thành công"
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
      await this.getBieuNhapLieuChiTieuList(value);
      this.overlay = false;
    }

    // edit(item) {
    //   this.dialog = true;
    //   this.isUpdate = true;
    //   this.titleDialog = "Chỉnh Sửa Biểu Nhập Liệu Kỳ Báo Cáo";
    //   this.kyBaoCao = this.bnlKyBaoCaoList.indexOf(item);
    // },

    // delete(tiem) {
    //   const index = this.items.indexOf(item);
    //   confirm("Xác nhận xóa?") && this.items.splice(index, 1);
    //   this.deleteBieuNhapLieuChiTieu(this.editedItem);
    // },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.items[this.editedIndex], this.editedItem);
    //   } else {
    //     this.items.push(this.editedItem);
    //   }
    //   this.close();
    // },

    // close() {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // }
  }
};
</script>