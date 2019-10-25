<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="kyBaoCao.nam" label="Năm" prepend-inner-icon="mdi-timetable"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="kyBaoCao.ma" label="Mã" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="kyBaoCao.ten"
              label="Kỳ báo cáo"
              prepend-inner-icon="mdi-database"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="kyBaoCao.trangThai"
              label="Trạng thái"
              prepend-inner-icon="mdi-eye"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayMo"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayMo"
                  label="Ngày mở"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="kyBaoCao.ngayMo" no-title @input="menu.ngayMo = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayDong"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayDong"
                  label="Ngày đóng"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="kyBaoCao.ngayDong" no-title @input="menu.ngayDong = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayBatDau"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayBatDau"
                  label="Ngày bắt đầu cập nhật"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="kyBaoCao.ngayBatDau"
                no-title
                @input="menu.ngayBatDau = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayKetThuc"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayKetThuc"
                  label="Ngày kết thúc tổng hợp"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="kyBaoCao.ngayKetThuc"
                no-title
                @input="menu.ngayKetThuc = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayBaoCaoHuyen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayBaoCaoHuyen"
                  label="Ngày hoàn thành báo cáo cấp huyện"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="kyBaoCao.ngayBaoCaoHuyen"
                no-title
                @input="menu.ngayBaoCaoHuyen = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="menu.ngayBaoCaoTinh"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="kyBaoCao.ngayBaoCaoTinh"
                  label="Ngày hoàn thành báo cáo cấp tỉnh"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="kyBaoCao.ngayBaoCaoTinh"
                no-title
                @input="menu.ngayBaoCaoTinh = false"
              ></v-date-picker>
            </v-menu>
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
    kyBaoCao: {
      type: Object,
      default: {
        nam: "",
        ma: "",
        ten: "",
        sysCapHanhChinhId: 0,
        ngayMo: "",
        ngayDong: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        trangThai: "",
        hieuLuc: 1,
        xoa: 0
      }
    },

    formTitle: {
      type: String,
      default: "Thêm kỳ báo cáo mới"
    }
  },

  data() {
    return {
      menu: {
        ngayMo: false,
        ngayDong: false,
        ngayBatDau: false,
        ngayKetThuc: false,
        ngayBaoCaoHuyen: false,
        ngayBaoCaoTinh: false
      }
    };
  }
};
</script>
