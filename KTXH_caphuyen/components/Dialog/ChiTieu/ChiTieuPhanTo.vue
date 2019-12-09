<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieuPhanTo.ma"
              label="Mã"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieuPhanTo.ten"
              label="Tên chỉ tiêu phân tổ"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-drag"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="chiTieuPhanTo.ghiChu"
              label="Ghi Chú"
              prepend-inner-icon="mdi-note"
            ></v-textarea>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="chiTieuPhanTo.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="blue darken-1" text @click="$emit('close')">Đóng</v-btn>
      <v-btn v-if="isWatch" color="blue darken-1" text @click="$emit('save')">Lưu</v-btn>
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
        ghiChu: ""
      }
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    isWatch: {
      type: Boolean,
      default: true
    }
  }
};
</script>