<template>
  <Table
    :title="title"
    :headers="headers"
    :items="kyBaoCaoList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
    @clickAdd="clickAddNew"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <KyBaoCao
        :kyBaoCao="kyBaoCao"
        :formTitle="titleDialog"
        @close="closeDialog"
        @save="saveKyBaoCaoDialog"
      />
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import KyBaoCao from "@/components/Dialog/BaoCao/KyBaoCao";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
    KyBaoCao
  },
  data() {
    return {
      title: "Khai Báo Kỳ Báo Cáo",
      dialog: false,
      isUpdate: false,
      titleDialog: "",
      headers: [
        {
          text: "Năm",
          align: "center",
          sorttable: true,
          value: "nam",
          type: "number"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Kỳ báo cáo",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ngày mở báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayMo",
          type: "date"
        },
        {
          text: "Ngày đóng báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayDong",
          type: "date"
        },
        // {
        //   text: "Ngày bắt đầu cập nhập",
        //   align: "center",
        //   sorttable: true,
        //   value: "ngayBatDau",
        //   type: "date"
        // },
        // {
        //   text: "Ngày kết thúc tổng hợp báo cáo",
        //   align: "center",
        //   sorttable: true,
        //   value: "ngayKetThuc",
        //   type: "date"
        // },
        // {
        //   text: "Ngày hoàn thành báo cáo cấp huyện",
        //   align: "center",
        //   sorttable: true,
        //   value: "ngayBaoCaoHuyen",
        //   type: "date"
        // },
        // {
        //   text: "Ngày hoàn thành báo cáo cấp tỉnh",
        //   align: "center",
        //   sorttable: true,
        //   value: "ngayBaoCaoTinh",
        //   type: "date"
        // },
        {
          text: "Trạng Thái",
          align: "center",
          value: "trangThai",
          type: "string"
        }
      ]
    };
  },

  computed: {
    ...mapState("quanly/qlKyBaoCao", ["kyBaoCaoList", "pagination"])
  },

  asyncData({ store }) {
    store.dispatch("quanly/qlKyBaoCao/getKyBaoCaoList");
  },

  created() {
    this.getKyBaoCaoList();
  },

  methods: {
    ...mapActions("quanly/qlKyBaoCao", [
      "getKyBaoCaoList",
      "getKyBaoCao",
      "addKyBaoCao",
      "updateKyBaoCao",
      "deleteKyBaoCao",
      "restoreKyBaoCao"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.titleDialog = "Thêm kỳ báo cáo mới";
      this.kyBaoCao = {
        nam: "",
        ma: "",
        ten: "",
        sysCapHanhChinhId: 0,
        ngayMo: "",
        ngayDong: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        trangThai: "",
        hieuLuc: 1,
        xoa: 0
      };
    },

    clickUpdateKyBaoCao() {
      this.dialog = true;
      this.isUpdate = true;
      this.titleDialog = "Chỉnh sửa kỳ báo cáo";
    },

    closeDialog() {
      this.dialog = false;
      this.kyBaoCao = {};
    },

    async saveKyBaoCaoDialog() {
      if (this.isUpdate) {
        await this.updateKyBaoCao(this.kyBaoCao);
      } else {
        await this.addKyBaocao(this.kyBaoCao);
      }

      this.dialog = false;
    },

    edit(item) {
      this.addKyBaoCao(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteKyBaoCao(this.editedItem);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>