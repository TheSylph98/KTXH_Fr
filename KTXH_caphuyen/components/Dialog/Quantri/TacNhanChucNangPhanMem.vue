<template>
  <div>
    <Table
      :title="title"
      :headers="headers"
      :items="chucNangPhamMemList"
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
      @pick="chonChucNangPhanMem()"
      @filter="getTacNhanList({queryData: $event})"
      @changePageSize="changeList({ pageSize: $event})"
      @changePage="changeList({ page: $event})"
    >
      <template v-slot:action="{ row }">
        <p>{{ selItems }}</p>
        <v-checkbox dense v-model="selItems" :value="row.item.id"></v-checkbox>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/table";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    tacnhan: {
      type: Object
    }
  },
  data() {
    return {
      isSelect: false,
      snackbar: false,
      dialog: false,
      notifiedType: "success",
      notification: "",
      selItems: [],
      tNCNPM: {},
      overlay: false,
      timeout: 1000,
      headers: [
        {
          text: "Tên chức năng phần mềm",
          align: "center",
          sorttable: false,
          value: "ten",
          width: "34%",
          type: "string"
        }
      ]
    };
  },
  computed: {
    ...mapState("quantri/qtChucNangPhanMem", [
      "chucNangPhamMemList",
      "chucNangPhamMem",
      "pagination"
    ]),
    ...mapState("quantri/qtTacNhan-ChucNangPhanMem", ["CNPMList"])
  },

  async created() {
    this.overlay = true;
    if (!this.chucNangPhamMemList.length) {
      await this.getChucNangPhamMemList();
    }
    await this.getCheckListCNPM(this.tacnhan.id);

    this.selItems = this.CNPMList;
    this.overlay = false;
  },

  methods: {
    ...mapActions("quantri/qtChucNangPhanMem", [
      "getChucNangPhamMemList",
      "getQTChucNangPhamMem"
    ]),
    ...mapActions("quantri/qtTacNhan-ChucNangPhanMem", [
      "getCheckListCNPM",
      "updateChucNangPhanMemList"
    ]),

    async changeList(value) {
      value.pageSize = value.pageSize
        ? value.pageSize
        : this.pagination.pageSize;
      value.page = value.page !== undefined ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getChucNangPhamMemList(value);
      this.overlay = false;
    },

    //
    async chonChucNangPhanMem(item) {
      this.tNCNPM.qtTacNhanId = Number(this.tacnhan.id);
      this.tNCNPM.listCNPMid = this.selItems;

      const { isSuccess } = await this.updateChucNangPhanMemList(this.tNCNPM);

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
    },
    //
    changeSelectItem(value, element) {
      if (value) {
        this.selItems.push(element);
      } else {
        const index = this.selItems.findIndex(item => item.id === element.id);
        this.selItems.splice(index, 1);
      }
    }
  }
};
</script>
