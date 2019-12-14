<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>

          <v-col cols="6">
            <v-text-field dense v-model="namBaoCao.ma" 
              label="Mã"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              dense
              v-model="namBaoCao.ten"
              label="Tên báo cáo"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-database"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              dense
              v-model="namBaoCao.nam"
              label="Năm"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-timetable"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="loaiBCList"
              :itemObj="loaiBCObj"
              label="Trạng thái đóng mở"
              :disabled="!isWatch"
              icon="mdi-apps"
              @select="namBaoCao.sysTrangThaiDongMoId = $event.id"
              @search="getSearchTrangThaiDongMoList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayMoNam"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="namBaoCao.ngayMoNam"
                  label="Ngày mở"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker dense v-model="namBaoCao.ngayMoNam" no-title :disabled="!isWatch" @input="menu.ngayMoNam = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-menu
              dense
              v-model="menu.ngayDongNam"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  v-model="namBaoCao.ngayDongNam"
                  label="Ngày đóng"
                  :disabled="!isWatch"
                  prepend-icon="mdi-calendar"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                dense
                v-model="namBaoCao.ngayDongNam"
                :disabled="!isWatch"
                no-title
                @input="menu.ngayDongNam = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12">
            <v-textarea
              dense
              v-model="namBaoCao.ghiChu"
              :disabled="!isWatch"
              label="Ghi Chú"
              prepend-inner-icon="mdi-note"
            ></v-textarea>
          </v-col>

          
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="namBaoCao.hieuLuc" :disabled="!isWatch" class="ma-1" label="Hiệu lực"></v-switch>
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
    namBaoCao: {
      type: Object,
      default: {
        ma: null,
        nam: null,
        ten: "",
        sysTrangThaiDongMoId: null,
        ngayMoNam: null,
        ngayDongNam: null,
        ghiChu: ""
      }
    },

    formTitle: {
      type: String,
      default: "Thêm báo cáo mới"
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
        ngayMoNam: false,
        ngayDongNam: false,
      }
    };
  },

  computed: {
    ...mapState("sys/sysTrangThaiDongMo", ["trangThaiDongMoList", "searchTrangThaiDongMoList"]),

    loaiBCList() {
      const sysTrangThaiDongMo = this.namBaoCao.belongsToSysTrangThaiDongMo
        ? this.namBaoCao.belongsToSysTrangThaiDongMo
        : [];
      if (this.searchTrangThaiDongMoList.length > 0) return sysTrangThaiDongMo.concat(this.searchTrangThaiDongMoList);
      else return sysTrangThaiDongMo.concat(this.trangThaiDongMoList);
    },

    loaiBCObj() {
      if (this.namBaoCao.belongsToSysTrangThaiDongMo) {
        return this.namBaoCao.belongsToSysTrangThaiDongMo[0];
      } else return {};
    },
  },
  methods: {
    ...mapActions("sys/sysTrangThaiDongMo", ["getSearchTrangThaiDongMoList"])
  }
};
</script>
