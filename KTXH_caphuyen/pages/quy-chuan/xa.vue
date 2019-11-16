<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="xaList"
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
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getXaList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <Xa
          v-if="dialog"
          :xa="xa_data"
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
      isWatch: true,
      overlay: false,
      titleDialog: "",
      xa_data: {},
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
    ...mapState("quychuan/qcXa", ["xaList", "xa", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quychuan/qcXa/getXaList");
  },

  async created() {
    if (!this.xaList.length) {
      this.overlay = true;
      await this.getXaList();
      this.overlay = false;
    }
  },

  async mounted() {
    await this.getHuyenList();
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
    ...mapActions("quychuan/qcHuyen", ["getHuyenList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm xã mới";
      this.xa_data = {
        ma: null,
        ten: null,
        qcHuyenId: null,
        sysCapDonViHanhChinh: null,
        sysLoaiDonViHanhChinhId : null,
        nongThon: true,
        bienGioi: false,
        haiDao: false,
        vungDBKhoKhan: false,
        ghiChu: ""
      };
    },
    
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem xã";
      await this.getXa(Number(item.id));
      this.xa_data = Object.assign({}, this.xa);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa xã";
      await this.getXa(Number(item.id));
      this.xa_data = Object.assign({}, this.xa);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteXa(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa xã thành công!";
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
      this.xa_data = {};
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateXa(this.xa_data);
      } else {
        res = await this.addXa(this.xa_data);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật xã thành công!"
          : "Thêm xã thành công!";
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
      await this.getXaList(value);
      this.overlay = false;
    }
  }
};
</script>