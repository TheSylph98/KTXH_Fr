<template>
  <v-card>
    <v-card-title>
      <span class="headline">Thêm mới chỉ tiêu</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="chiTieu.ma" label="Kí hiệu*"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="chiTieu.ten" label="Tên biểu nhập liệu*"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="chiTieu.bieuNhapLieuId" label="Biểu Nhập Liệu ID*"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="chiTieu.chiTieuId" label="Chi Tiêu ID*"></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="6">
            <v-switch v-model="chiTieu.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
          </v-col>
           <v-col cols="6">
            <v-switch v-model="chiTieu.xoa" class="ma-1" label="Xóa"></v-switch>
          </v-col>
        </v-row> -->
        <v-row>
            <v-col cols="12">
            <v-textarea v-model="chiTieu.ghiChu" label="Ghi Chú"></v-textarea>
          </v-col>
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
          bieuNhapLieuId: 0,
          chiTieuId: 0,
          ghiChu: "",
          hieuLuc: 1,
          xoa: 0
      }
    }
  }
}
</script>