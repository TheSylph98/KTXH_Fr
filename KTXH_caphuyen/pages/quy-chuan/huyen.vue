<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="huyenList"
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
      @filter="getHuyenList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <Huyen
          v-if="dialog"
          :huyen="huyen_data"
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
      isWatch: true,
      overlay: false,
      titleDialog: "",
      huyen_data: {},
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttable: true,
          value: "ma",
          width: "12.75%",
          type: "string"
        },
        {
          text: "Tên",
          align: "center",
          sorttable: false,
          value: "ten",
          width: "34%",
          type: "string"
        },
        {
          text: "Ghi Chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          width: "29.75%",
          type: "string"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          width: "8.5%",
          type: ""
        }
      ],
      snackbar: false,
      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },
  computed: {
    ...mapState("quychuan/qcHuyen", ["huyenList", "huyen", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcHuyen/getHuyenList");
  },

  async created() {
    if (!this.huyenList.length) {
      this.overlay = true;
      await this.getHuyenList();
      this.overlay = false;
    }
  },

  async mounted() {
    await this.getTinhList();
    await this.getCapHanhChinhList();
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
    ...mapActions("quychuan/qcTinh", ["getTinhList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getCapHanhChinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch =true;
      this.titleDialog = "Thêm huyện mới";
      this.huyen_data = {
        ma: null,
        ten: null,
        qcTinhId: null,
        sysCapDonViHanhChinh: null,
        sysLoaiDonViHanhChinhId : null,
        nongThon: false,
        bienGioi: false,
        haiDao: false,
        vungDBKhoKhan: false,
        ghiChu: ""
      };
    },
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem huyện";
      await this.getHuyen(Number(item.id));
      this.huyen_data = Object.assign({}, this.huyen);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa huyện";
      await this.getHuyen(Number(item.id));
      this.huyen_data = Object.assign({}, this.huyen);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteHuyen(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa huyện thành công!";
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
      this.huyen_data = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateHuyen(this.huyen_data);
      } else {
        res = await this.addHuyen(this.huyen_data);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật huyện thành công"
          : "Thêm huyện thành công thành công!";
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
      value.pageSize = value.pageSize !== undefined
        ? value.pageSize
        : this.pagination.pageSize;
      value.page = value.page !== undefined  ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getHuyenList(value);
      this.overlay = false;
    }
  }
};
</script>