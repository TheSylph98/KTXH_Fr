<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="tacNhanList"
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
      @filter="getTacNhanList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }"></template>
        <TacNhan
          v-if="dialog"
          :tacNhan="tN"
          :formTitle="titleDialog"
          :isWatch="isWatch"
          :isUpdate="isUpdate"
          @close="closeDialog"
          @save="saveTacNhanDialog"
        />
      </v-dialog>

      <template v-slot:action="{ row }">
        <Icon btnIcon="mdi-eye" btnTooltip="Xem" @click="clickWatch(row.item)" />
        <Icon btnIcon="mdi-pencil" btnTooltip="Chỉnh sửa" @click="clickEdit(row.item)" />
        <Icon btnIcon="mdi-delete" btnTooltip="Xóa" @click="clickDeleteItem(row.item)" />
        <Icon
          btnIcon="mdi-drag" 
          btnTooltip="Chon chuc nang phan mem"
          @click="chonChucNangPhanMem(row.item)"
        ></Icon>
      </template>
    
    </Table>

    <v-dialog v-model="pickDialog" width="800">
      <TNCNPM
        :title="tenTacNhan"
        :tacnhan="TacNhanP"
        @closeUTN="closeDialog"
      ></TNCNPM>
    </v-dialog>

    <v-dialog v-model="deletedDialog" width="500" @click:outside="closeDeleteDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Xóa người dùng</v-card-title>

        <v-card-text>Bạn có chắc chắn muốn xóa hay không?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDeleteDialog">Huỷ</v-btn>
          <v-btn color="primary" text @click="deleted(deleteItems)">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import TacNhan from "@/components/Dialog/Quantri/TacNhan";
import Icon from "@/components/Icon";
import TNCNPM from "../../components/Dialog/Quantri/TacNhanChucNangPhanMem";
export default {
  components: {
    Table,
    TacNhan,
    Icon,
    TNCNPM
  },
  data() {
    return {
      title: "Khai báo tác nhân",
      dialog: false,
      tenTacNhan: "",
      TacNhanP: {},
      deletedDialog: false,
      pickDialog: false,
      deleteItems: [],
      isUpdate: false,
      isWatch: true,
      overlay: false,
      titleDialog: "",
      tN: {},
      headers: [
        {
          text: "Tên tác nhân",
          align: "center",
          sorttable: false,
          value: "ten",
          width: "34%",
          type: "string"
        },
        {
          text: "Cấp hành chính",
          align: "center",
          sorttable: false,
          value: "belongsToSysCapHanhChinh.ten",
          width: "12.75%",
          type: ""
        },
        {
          text: "Chức năng, nhiệm vụ",
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
    ...mapState("quantri/qtTacNhan", ["tacNhanList", "tacNhan", "pagination"])
  },

  // asyncData({ store }) {
  //   store.dispatch("quantri/qtTacNhan/getTacNhanList");
  // },

  async created() {
    if (!this.tacNhanList.length) {
      this.overlay = true;
      await this.getTacNhanList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quantri/qtTacNhan", [
      "getTacNhanList",
      "getQTTacNhan",
      "addQTTacNhan",
      "updateQTTacNhan",
      "deleteQTTacNhan",
      "restoreQTTacNhan"
    ]),
    ...mapActions("sys/sysCapHanhChinh", ["getCapHanhChinhList"]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.isWatch = true;
      this.titleDialog = "Thêm tác nhân mới";
      this.tN = {
        ma: null,
        ten: null,
        sysCapHanhChinhId: null,
        ghiChu: ""
      };
    },
    async clickWatch(item) {
      this.overlay = true;
      this.titleDialog = "Xem tác nhân";
      await this.getQTTacNhan(Number(item.id));
      this.tN = Object.assign({}, this.tacNhan);
      this.isWatch = false;
      this.isUpdate = true;
      this.overlay = false;
      this.dialog = true;
    },

    async clickEdit(item) {
      this.overlay = true;
      this.titleDialog = "Chỉnh sửa tác nhân";
      await this.getQTTacNhan(Number(item.id));
      this.tN = Object.assign({}, this.tacNhan);
      this.isUpdate = true;
      this.isWatch = true;
      this.overlay = false;
      this.dialog = true;
    },

     clickDeleteItem(value) {
      this.deleteItems = [value]
      this.deletedDialog = true
    },

    closeDeleteDialog() {
      this.deletedDialog = []
      this.deletedDialog = false
    },

    async deleted(items) {
      const { isSuccess } = await this.deleteQTTacNhan(items.map(e => e.id));

      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Xóa chỉ tiêu nhóm thành công!";
      } else {
        this.notifiedType = "error";
        this.notification = "Đã có lỗi xảy ra, vui lòng thử lại!";
      }

      this.deletedDialog = false;
      this.deleteItems = {};
      
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },

    closeDialog() {
      this.dialog = false;
      this.isUpdate = false;
      this.isWatch = true;
      this.tN = {};
      this.titleDialog = "";
      this.pickDialog = false;
    },

    async saveTacNhanDialog() {
      let res;

      if (this.isUpdate) {
        res = await this.updateQTTacNhan(this.tN);
      } else {
        res = await this.addQTTacNhan(this.tN);
        this.closeDialog();
      }

      if (res.isSuccess) {
        this.notifiedType = "success";
        this.notification = this.isUpdate
          ? "Cập nhật tác nhân thành công"
          : "Thêm tác nhân thành công!";
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
      await this.getTacNhanList(value);
      this.overlay = false;
    },

    chonChucNangPhanMem(item) {
      this.TacNhanP = item;
      this.tenTacNhan = "Tác nhân: " + item.ten;
      this.pickDialog = true;
    },

  }
};
</script>