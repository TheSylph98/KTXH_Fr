<template>
  <v-card>
    <Table
      :title="title"
      :headers="headers"
      :items="tacNhanList"
      :pagination="pagination"
      isInDialog
      :snackbar="snackbar"
      :notifiedType="notifiedType"
      :notification="notification"
      :timeout="timeout"
      :tableWidth="{
      'checkbox': '2.25%',
      'index': '4.25%',
      'action': '8.5%'
    }"
      @closeD="$emit('close')"
      @pick="chonTacNhan()"
      @filter="getTacNhanList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <template v-slot:action="{ row }">
        <v-checkbox dense v-model="selItems" :value="row.item.id"></v-checkbox>
      </template>
    </Table>
  </v-card>
</template>

<script>
//@pick="$emit('pickTN', selItems)"

import Table from "@/components/table";
import { mapState, mapActions } from "vuex";
let PickList = require('@/util/checkListPick')
const Promise = require('bluebird')

export default {
  components: {
    Table
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      title: "",
      selectItems: [],
      dialog: false,

      notifiedType: "success",
      notification: "",
      selItems: [],
      userTacNhanList: {},
      overlay: false,
      timeout: 1000,
      snackbar: false,
      headers: [
        {
          text: "Tác nhân",
          align: "center",
          sorttable: true,
          value: "ten",
          type: "number",
          width: "8.5%"
        }
      ]
    };
  },

  computed: {
    ...mapState("quantri/qtTacNhan", ["tacNhanList", "tacNhan", "pagination"]),
    ...mapState("quantri/qtUser_TacNhan", ["tacNhanUserList"])
  },

  async created() {
    this.overlay = true;
    if (!this.tacNhanList.length) {
      await this.getTacNhanList();
    }
    await this.getCheckListTacNhan(this.user.id);
    this.selItems = this.tacNhanUserList;
    this.overlay = false;
  },

  methods: {
    ...mapActions("quantri/qtTacNhan", ["getTacNhanList", "getQTTacNhan"]),
    ...mapActions("quantri/qtUser_TacNhan", [
      "updateTacNhanList",
      "updateTacNhanList1",
      "addQTUserTacNhan",
      "deleteQTUserTacNhan",
      "getQTUserTacNhan",
      "getCheckListTacNhan"
    ]),

    async changeList(value) {
      value.pageSize =
        value.pageSize !== undefined
          ? value.pageSize
          : this.pagination.pageSize;
      value.page = value.page !== undefined ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getTacNhanList(value);
      this.overlay = false;
    },

    //
    async chonTacNhan(item) {

      this.userTacNhanList.qtUsersId = Number(this.user.id);
      this.userTacNhanList.listTNid = this.selItems;
      this.userTacNhanList.oldList = this.tacNhanUserList;

      const { isSuccess } = await this.updateTacNhanList1(this.userTacNhanList);
      
      if (isSuccess) {
        this.notifiedType = "success";
        this.notification = "Chọn thành công!";
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