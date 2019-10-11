<template>
    <v-card>
        <v-card-title>
          <span class="headline">Thêm Mới Chỉ Tiêu</span>
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
</template>