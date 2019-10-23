<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="chiTieuNhom.ma" label="Mã"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="chiTieuNhom.ten" label="Tên"></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-textarea v-model="chiTieuNhom.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="chiTieuNhom.hieuLuc" class="ma-1" label="Hieu luc"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="chiTieuNhom.xoa" class="ma-1" label="Xóa"></v-switch>
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
    chiTieuNhom: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        ghiChu: ""
      }
    },
    formTitle: {
      type: String,
      default: "Thêm mới chỉ tiêu nhóm"
    }
  }  
}
</script>