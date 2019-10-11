<template>
  <Table
    :title="title"
    :headers="headers"
    :items="chiTieuList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="1000px">
      <template v-slot:activator="{ on }"></template>
      <ChiTieu/>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";
import ChiTieu from "@/components/Dialog/ChiTieu"

export default {
  components: {
    Table,
    ChiTieu
  },
  data() {
    return {
      title: "Chỉ Tiêu Kinh Tế Xã Hội",
      dialog: false,
      caccap: ["cấp tỉnh", "cấp huyện", "cấp xã"],
      headers: [
        {
          text: "Nhóm CT",
          align: "center",
          sorttable: false,
          value: "chiTieuNhomId",
          type: "string"
        },
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên chỉ tiêu",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Đơn vị tính",
          align: "center",
          sorttable: false,
          value: "donViTinh",
          type: "string"
        },
        {
          text: "Phân tổ",
          align: "center",
          sorttable: false,
          value: "chiTieuPhanToId",
          type: ""
        },
        { text: "Hiệu lực", align: "center", value: "hieuLuc", type: "" }
      ],
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        capNhapLieuId: 0,
        capTongHopId: 0,
        chiTieuNhomId: 0,
        chiTieuPhanToId: 0,
        chiTieuChaId: 0,
        congDonTuDuoiLen: true,
        congTheoMa: 0,
        congThucCong: "",
        coPhanToKhong: 1,
        donViTinh: "",
        tuSo: "",
        mauSo: "",
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        capNhapLieuId: 0,
        capTongHopId: 0,
        chiTieuNhomId: 0,
        chiTieuPhanToId: 0,
        chiTieuChaId: 0,
        congDonTuDuoiLen: true,
        congTheoMa: 0,
        congThucCong: "",
        coPhanToKhong: 1,
        donViTinh: "",
        tuSo: "",
        mauSo: "",
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("chiTieu", ["chiTieuList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("chiTieu/getChiTieuList");
  },

  created() {
    this.getChiTieuList();
  },

  methods: {
    ...mapActions("chiTieu", [
      "getChiTieuList",
      "getChiTieu",
      "addChiTieu",
      "updateChiTieu",
      "deleteChiTieu",
      "restoreChiTieu"
    ]),
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addChiTieu(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteChiTieu(this.editedItem);
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