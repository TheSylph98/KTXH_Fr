<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4">
            <SelectedWithSearch
              :items="tList"
              :itemObj="tinhObj"
              label="Tỉnh"
              :rules="[v => !!v || 'Không được để trống']"
              icon="mdi-map-marker"
              @select="huyen.qcTinhId = $event.id"
              @search="getSearchTinhList($event)"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              dense
              v-model="huyen.ma"
              label="Mã huyện"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field dense v-model="huyen.ten" label="Tên Huyện"
             :rules="[v => !!v || 'Không được để trống']"
             prepend-inner-icon="mdi-drag"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="6">
            <SelectedWithSearch
              :items="caphcList"
              :itemObj="capHanhChinhObj"
              label="Cấp đơn vị hành chính*"
              icon="mdi-apps"
              @select="huyen.sysCapDonViHanhChinh = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col class="d-flex" cols="6">
            <SelectedWithSearch
              :items="loaidvhcList"
              :itemObj="loaidvhcObj"
              label="Loại đơn vị hành chính*"
              icon="mdi-apps"
              @select="huyen.sysLoaiDonViHanhChinhId  = $event.id"
              @search="getSearchLoaiDonViHanhChinhList($event)"
            />
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="huyen.nongThon" class="ma-1" label="Nông thôn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="huyen.bienGioi" class="ma-1" label="Biên giới"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="huyen.haiDao" class="ma-1" label="Hải đảo"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch
              dense
              v-model="huyen.vungDBKhoKhan"
              class="ma-1"
              label="Vùng đặc biệt khó khăn"
            ></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-textarea dense v-model="huyen.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="huyen.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
    huyen: {
      type: Object
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
  },
  computed: {
    ...mapState("quychuan/qcTinh", ["tinhList", "searchTinhList"]),
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    ...mapState("sys/sysLoaiDonViHanhChinh", ["loaiDonViHanhChinhList", "searchLoaiDonViHanhChinhList"]),
    tList() {
      if (this.searchTinhList.length > 0) return this.searchTinhList;
      else return this.tinhList;
    },
    caphcList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    },

    loaidvhcList() {
      if (this.searchLoaiDonViHanhChinhList.length > 0)
        return this.searchLoaiDonViHanhChinhList;
      else return this.loaiDonViHanhChinhList;
    },
    loaidvhcObj() {
      if (this.huyen.belongsToSysLoaiDonViHanhChinh) {
        return this.huyen.belongsToSysLoaiDonViHanhChinh[0];
      } else return {};
    },

    tinhObj() {
      if (this.huyen.belongsToQCTinh) {
        return this.huyen.belongsToQCTinh[0];
      } else return {};
    },
    capHanhChinhObj() {
      if (this.huyen.belongsToSysCapHanhChinh) {
        return this.huyen.belongsToSysCapHanhChinh[0];
      } else return {};
    },
  },
  methods: {
    ...mapActions("quychuan/qcTinh", ["getSearchTinhList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"]),
    ...mapActions("sys/sysLoaiDonViHanhChinh", ["getSearchLoaiDonViHanhChinhList"])
  }
};
</script>