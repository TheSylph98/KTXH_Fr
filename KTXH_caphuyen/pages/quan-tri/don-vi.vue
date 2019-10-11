<template>
  <Table
    :title="title"
    :headers="headers"
    :items="donViList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <DonVi/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import DonVi from "@/components/Dialog/DonVi"
export default {
  components: {
    Table,
    DonVi
  },
  data() {
    return {
      title: "Khai Báo Đơn Vị",
      headers: [
        {
          text: "Mã đơn vị",
          align: "center",
          divider: true,
          value: "ma",
          type: "string"
        },
        { text: "Tên đơn vị", align: "center", value: "ten", type: "string" },
        {
          text: "Số điện thoại",
          align: "center",
          value: "soDienThoai",
          type: "string"
        },
        { text: "Đơn vị cha", align: "center", value: "donViChaId", type: "" },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        donViChaId: 0,
        diaChi: "",
        soDienThoai: "",
        email: "",
        ghiChu: "",
        laDonVi: false,
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        donViChaId: 0,
        diaChi: "",
        soDienThoai: "",
        email: "",
        ghiChu: "",
        laDonVi: false,
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("qtDonVi", ["donViList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("qtDonVi/getQTDonViList");
  },

  created() {
    this.getQTDonViList();
  },

  methods: {
    ...mapActions("qtDonVi", [
      "getQTDonViList",
      "getQTDonVi",
      "addQTDonVi",
      "updateQTDonVi",
      "deleteQTDonVi",
      "restoreQTDonVi"
    ]),
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.editedIndex = this.items.indexOf(item);
      this.addQTDonVi(this.editedIndex);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteQTDonVi(this.editedItem);
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateQTDonVi(this.editedItem);
      } else {
        this.addQTDonVi(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>