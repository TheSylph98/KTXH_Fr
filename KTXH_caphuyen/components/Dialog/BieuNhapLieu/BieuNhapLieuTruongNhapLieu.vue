<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.ma" label="Kí Hiệu*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.ten" label="Tên Biểu Nhập Liệu*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.bieuNhapLieuId" label="Biểu Nhập Liệu ID*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.truongNhapLieuId" label="Trường Nhập Liệu ID*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="truongNhapLieu.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="truongNhapLieu.hieuLuc" class="ma-1" label="Hiệu Lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="truongNhapLieu.xoa" class="ma-1" label="Xóa"></v-switch>
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
    truongNhapLieu: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        truongNhapLieuId: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },

    formTitle: {
      type: String,
      default: "Thêm mới trường nhập liệu"
    }
  }
}
</script>