<template>
  <Table
    :title="title"
    :headers="headers"
    :items="items_t"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="1000px">
      <template v-slot:activator="{ on }"></template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.id" label="STT*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ma" label="Mã Chỉ Tiêu*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ten" label="Tên Chỉ Tiêu*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.capNhapLieuId" label="Cấp Nhập liệu Id*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.capTongHopId" label="Cấp Tổng Hợp Id*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.chiTieuNhomId" label="Chỉ Tiêu Nhóm Id*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.chiTieuPhanToId" label="Chỉ Tiêu Phân Tổ*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.chiTieuChaId" label="Chỉ Tiêu Cha*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.congDonTuDuoiLen" label="Chỉ Tiêu Cha*"></v-text-field>
                <v-switch
                  v-model="editedItem.congDonTuDuoiLen"
                  class="ma-1"
                  label="Cộng Từ Dưới Lên"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.congTheoMa" label="Cộng Theo Mã"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.congThucCong" label="Cộng Công Thức"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  v-model="editedItem.coPhanToKhong"
                  class="ma-1"
                  label="Có phân tổ hay không?"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.donViTinh" label="Đơn Vị Tính*"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.tuSo" label="Tử Số"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.mauSo" label="Mẫu Số"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.tinhPhanTram" class="ma-1" label="Tính Phần Trăm"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.xoa" class="ma-1" label="Xóa"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Đóng</v-btn>
          <v-btn color="blue darken-1" text @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table
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