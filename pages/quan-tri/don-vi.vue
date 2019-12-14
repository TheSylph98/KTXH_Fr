<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="donViList"
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
      @delete="deleted($event)"
      @clickAdd="clickAddNew"
      @filter="getQTDonViList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <DonVi
          v-if="dialog"
          :donVi="dv"
          :formTitle="titleDialog"
          :isWatch="isWatch"
          :isUpdate="isUpdate"
          @close="closeDialog"
          @save="saveChiTieuDialog"
        />
      </v-dialog>

      <template v-slot:ten="{ column }">
        <span :style="{marginLeft: `${1 * (Number(column.item.level) - 1)}em`}">{{ column.item.ten}}</span>
      </template>

      <template v-slot:action="{ row }">
        <Icon btnIcon="mdi-eye" btnTooltip="Xem" @click="clickWatch(row.item)" />
        <Icon btnIcon="mdi-pencil" btnTooltip="Chỉnh sửa" @click="clickEdit(row.item)" />
        <Icon btnIcon="mdi-delete" btnTooltip="Xóa" @click="clickDeleteItem(row.item)" />
        <Icon btnIcon="mdi-drag" btnTooltip="Chọn địa bàn" @click="chonDiaBan(row.item)"></Icon>
      </template>
    </Table>

    <v-dialog v-model="deletedDialog" width="500" @click:outside="closeDeleteDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Xóa đơn vị</v-card-title>

        <v-card-text>Bạn có chắc chắn muốn xóa đơn vị hay không?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDeleteDialog">Huỷ</v-btn>
          <v-btn color="primary" text @click="deleted(deleteItems)">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="clickLocationDialog" max-width="800px" @click:outside="closeDialog">
      <DonViDiaBan
        v-if="clickLocationDialog"
        :donVi="dv"
        @save="hanleChangeDonViDiaBan"
        @close="closeDialog"
      />
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import DonVi from "@/components/Dialog/Quantri/DonVi";
import Icon from "@/components/Icon";
import DonViDiaBan from "@/components/Dialog/Quantri/DonViDiaBan";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    DonVi,
    Icon,
    DonViDiaBan
  },

  data() {
    return {
      title: "Khai Báo Đơn Vị",
      dialog: false,
      isUpdate: false,
      isWatch: true,
      overlay: false,
      dv: {},
      titleDialog: "",
      headers: [
        {
          text: "Mã đơn vị",
          align: "center",
          value: "ma",
          type: "string",
          width: "8.5%",
          divider: false
        },
        {
          text: "Tên đơn vị",
          width: "29.75%",
          align: "left",
          value: "ten",
          type: "string"
        },
        {
          text: "Số điện thoại",
          align: "center",
          value: "soDienThoai",
          type: "string",
          width: "12.75%",
          divider: false
        },
        {
          text: "Nhóm đơn vị",
          align: "center",
          value: "belongsToSysNhomDonVi.ten",
          type: "string",
          width: "25.5%",
          divider: true
        },
        {
          text: "Hiệu lực",
          align: "center",
          value: "hieuLuc",
          width: "8.5%",
          type: ""
        }
      ],
      snackbar: false,
      deletedDialog: false,
      deleteItems: [],

      clickLocationDialog: false,

      notifiedType: "success",
      notification: "",
      timeout: 1000
    };
  },

  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "donVi", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quantri/qtDonVi/getQTDonViList");
  },

  async created() {
    if (!this.donViList.length) {
      this.overlay = true;
      await this.getQTDonViList();
      await this.getNhomDonViList();
      this.overlay = false;
    }
  },

  async mounted() {
    await Promise.all([this.getAllTinh(), this.getNhomDonViList()]);
  },

  methods: {
    ...mapActions("quantri/qtDonVi", [
      "getQTDonViList",
      "getQTDonVi",
      "addQTDonVi",
      "updateQTDonVi",
      "deleteQTDonVi",
      "restoreQTDonVi"
    ]),
    ...mapActions("sys/sysNhomDonVi", ["getNhomDonViList"]),
    ...mapActions("quychuan/qcTinh", ["getAllTinh"]),
    ...mapActions("quantri/qtDonViDiaBan", [
      "getDonViDiaBanListByDonViId",
      "chooseQTDonViDiaBanList"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm đơn vị mới";
      this.dv = {
        ma: null,
        ten: null,
        diaChi: "",
        soDienThoai: "",
        donViChaId: 0,
        sysNhomDonViId: 0,
        email: "",
        ghiChu: "",
        laDonVi: true
      };
    },
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem đơn vị";
      await this.getQTDonVi(Number(item.id));
      this.dv = Object.assign({}, this.donVi);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },
    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa đơn vị";
      await this.getQTDonVi(Number(item.id));
      this.dv = Object.assign({}, this.donVi);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

    clickDeleteItem(value) {
      this.deleteItems = [value];
      this.deletedDialog = true;
    },

    closeDeleteDialog() {
      this.deletedItems = [];
      this.deletedDialog = false;
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteQTDonVi(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa đơn vị thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.deletedDialog = false;
      this.deleteItems = [];

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    async chonDiaBan(value) {
      this.overlay = true;
      await this.getDonViDiaBanListByDonViId(value.id);
      this.overlay = false;
      this.dv = value;
      this.clickLocationDialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.isWatch = true;
      this.dv = {};
      this.clickLocationDialog = false;
      this.titleDialog = "";
    },

    async saveChiTieuDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateQTDonVi(this.dv);
      } else {
        res = await this.addQTDonVi(this.dv);
        await this.getQTDonViList();
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật đơn vị thành công"
          : "Thêm đơn vị thành công!";
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
      await this.getQTDonViList(value);
      this.overlay = false;
    },

    async hanleChangeDonViDiaBan(value) {
      const { isSuccess } = await this.chooseQTDonViDiaBanList(value);

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Cập nhật địa bàn thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    }
  }
};
</script>