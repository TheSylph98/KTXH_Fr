<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.ma" label="Mã"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.ten" label="Họ Và Tên*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.matKhau" label="Mat Khau*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.soDienThoai" label="Số điện thoại"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.qtDonViId" label="Đơn vị"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="user.ghiChu" label="Ghi Chú"></v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="user.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="user.xoa" class="ma-1" label="Xóa"></v-switch>
          </v-col>-->
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
    user: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        qtDonViId: 0
      }
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  }
};
</script>