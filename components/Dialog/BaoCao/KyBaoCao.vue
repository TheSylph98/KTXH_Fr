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
              v-model="kyBaoCao.nam"
              label="Năm"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-timetable"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field dense v-model="kyBaoCao.ma" label="Mã"
             :disabled="!isWatch"
             :rules="[v => !!v || 'Không được để trống']"            
             prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              dense
              v-model="kyBaoCao.ten"
              label="Kỳ báo cáo"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-database"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              dense
              v-model="kyBaoCao.trangThai"
              :disabled="!isWatch"
              label="Trạng thái"
              prepend-inner-icon="mdi-eye"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="loaiBCList"
              :itemObj="loaiBCObj"
              :disabled="!isWatch"
              label="Loại báo cáo"
              icon="mdi-apps"
              @select="kyBaoCao.sysLoaiBaoCaoId = $event.id"
              @search="getSearchLoaiBaoCaoList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayMo"
              :disabled="!isWatch"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayMo"
                  label="Ngày mở*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker dense v-model="kyBaoCao.ngayMo"
               :disabled="!isWatch"
               no-title @input="menu.ngayMo = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayDong"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayDong"
                  label="Ngày đóng*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayDong"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayDong = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayBatDau"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayBatDau"
                  label="Ngày bắt đầu cập nhật*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayBatDau"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayBatDau = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayTongHop"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayTongHop"
                  label="Ngày kết thúc tổng hợp*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayTongHop"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayTongHop = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayBaoCaoHuyen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayBaoCaoHuyen"
                  label="Ngày hoàn thành báo cáo cấp huyện*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayBaoCaoHuyen"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayBaoCaoHuyen = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayBaoCaoTinh"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayBaoCaoTinh"
                  label="Ngày hoàn thành báo cáo cấp tỉnh*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayBaoCaoTinh"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayBaoCaoTinh = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12">
            <v-menu
              dense
              v-model="menu.ngayBaoCaoTW"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="kyBaoCao.ngayBaoCaoTW"
                  label="Ngày hoàn thành báo cáo cấp Trung ương*"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="kyBaoCao.ngayBaoCaoTW"
                no-title
                :disabled="!isWatch"
                @input="menu.ngayBaoCaoTW = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="kyBaoCao.hieuLuc" :disabled="!isWatch" class="ma-1" label="Hiệu lực"></v-switch>
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
import SelectedWithSearch from "@/components/SelectedWithSearch/SelectedWithSearch";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    SelectedWithSearch
  },
  props: {
    kyBaoCao: {
      type: Object
    },

    formTitle: {
      type: String,
      default: "Thêm kỳ báo cáo mới"
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    isWatch: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menu: {
        ngayMo: false,
        ngayDong: false,
        ngayBatDau: false,
        ngayTongHop: false,
        ngayBaoCaoHuyen: false,
        ngayBaoCaoTinh: false,
        ngayBaoCaoTW: false
      }
    };
  },

  computed: {
    ...mapState("sys/sysLoaiBaoCao", ["loaiBaoCaoList", "searchLoaiBaoCaoList"]),

    loaiBCList() {
      const sysLoaiBaoCao = this.kyBaoCao.belongsToSysLoaiBaoCao
        ? this.kyBaoCao.belongsToSysLoaiBaoCao
        : [];
      if (this.searchLoaiBaoCaoList.length > 0) return sysLoaiBaoCao.concat(this.searchLoaiBaoCaoList);
      else return sysLoaiBaoCao.concat(this.loaiBaoCaoList);
    },

    loaiBCObj() {
      if (this.kyBaoCao.belongsToSysLoaiBaoCao) {
        return this.kyBaoCao.belongsToSysLoaiBaoCao[0];
      } else return {};
    },
  },
  methods: {
    ...mapActions("sys/sysLoaiBaoCao", ["getSearchLoaiBaoCaoList"])
  }
};
</script>
