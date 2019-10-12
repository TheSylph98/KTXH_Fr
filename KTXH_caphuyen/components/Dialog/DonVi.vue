<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.ma" label="Mã Đơn Vị*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.ten" label="Tên Đơn Vị*"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.donViChaId" label="Đơn Vị Cha*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.diaChi" label="Địa Chỉ"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.soDienThoai" label="Số Điện Thoại"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="donVi.email" label="Email"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-textarea v-model="donVi.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="donVi.laDonVi" class="ma-1" label="Là Đơn Vị"></v-switch>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="donVi.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="donVi.xoa" class="ma-1" label="Xóa"></v-switch>
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
      donVi: {
        type: Object,
        default: {
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
      },
      formTitle: {
        type: String,
        default: "Thêm Mới"
      }
    }
}
</script>