<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="chiTieu.ma" label="Mã Chỉ Tiêu*"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="chiTieu.ten" label="Tên Chỉ Tiêu*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="chiTieu.capNhapLieuId" label="Cấp Nhập liệu Id*"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="chiTieu.capTongHopId" label="Cấp Tổng Hợp Id*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="chiTieu.chiTieuNhomId" label="Chỉ Tiêu Nhóm Id*"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="chiTieu.chiTieuPhanToId" label="Chỉ Tiêu Phân Tổ*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="chiTieu.chiTieuChaId" label="Chỉ tiêu cha*"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="chiTieu.donViTinh" label="Đơn Vị Tính*"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-switch
                  v-model="chiTieu.congDonTuDuoiLen"
                  class="ma-1"
                  label="Cộng Từ Dưới Lên"
                ></v-switch>
              </v-col>

               <v-col cols="6">
                <v-switch
                  v-model="chiTieu.congTheoMa"
                  class="ma-1"
                  label="Cộng theo mã"
                ></v-switch>
              </v-col>

              <v-col class="d-flex" cols="6">
                <v-textarea v-model="chiTieu.congThucCong" label="Cộng Công Thức"></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-switch
                  v-model="chiTieu.coPhanToKhong"
                  class="ma-1"
                  label="Có phân tổ hay không?"
                ></v-switch>
              </v-col>

              <v-col class="d-flex" cols="4">
                <v-switch v-model="chiTieu.tinhPhanTram" class="ma-1" label="Tính Phần Trăm"></v-switch>
              </v-col>

              <v-col class="d-flex" cols="4">
                <v-text-field v-model="chiTieu.tuSo" label="Tử Số"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="4">
                <v-text-field v-model="chiTieu.mauSo" label="Mẫu Số"></v-text-field>
              </v-col>

              <v-col class="d-flex" cols="12">
                <v-textarea v-model="chiTieu.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <!-- <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="chiTieu.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="chiTieu.xoa" class="ma-1" label="Xóa"></v-switch>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="$emit('close')">Đóng</v-btn>
          <v-btn color="blue darken-1" text @click="$emit('save')">Lưu</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
  props: {
    chiTieu: {
      type: Object,
      default: {
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
    },
    formTitle: {
      type: String,
      default: "Thêm mới chỉ tiêu"
    }
  }
}
</script>