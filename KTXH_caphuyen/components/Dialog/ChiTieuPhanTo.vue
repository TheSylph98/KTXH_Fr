<template>
     <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="chiTieuPhanTo.ma" label="Kí hiệu*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="chiTieuPhanTo.ten" label="Tên biểu nhập liệu*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="chiTieuPhanTo.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="chiTieuPhanTo.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="chiTieuPhanTo.xoa" class="ma-1" label="Xóa"></v-switch>
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
      chiTieuPhanTo: {
        type: Object,
        default: {
          ma: "",
          ten: "",
          ghiChu: "",
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