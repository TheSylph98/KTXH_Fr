<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <SelectedWithSearch
              :items="hList"
              :itemObj="huyenObj"
              label="Huyện*"
              icon="mdi-map-marker"
              @select="xa.qcHuyenId = $event.id"
              @search="getSearchHuyenList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field dense v-model="xa.ma" label="Mã xã*" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field dense v-model="xa.ten" label="Xã*" prepend-inner-icon="mdi-drag"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="6">
            <SelectedWithSearch
              :items="caphcList"
              :itemObj="capHanhChinhObj"
              label="Cấp đơn vị hành chính*"
              icon="mdi-apps"
              @select="xa.sysCapDonViHanhChinh = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-select
              dense
              :items="loaidonViHanhChinh"
              v-model="xa.loaiDonViHanhChinh"
              label="Loại đơn vị hành chính"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="xa.nongThon" class="ma-1" label="Nông thôn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="xa.bienGioi" class="ma-1" label="Biên giới"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="xa.haiDao" class="ma-1" label="Hải đảo"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="3">
            <v-switch dense v-model="xa.vungDBKhoKhan" class="ma-1" label="Vùng đặc biệt khó khăn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="12">
            <v-textarea dense v-model="xa.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
           <v-col v-if="isUpdate" class="d-flex" cols="4" >
            <v-switch dense v-model="xa.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
import SelectedWithSearch from "@/components/SelectedWithSearch/SelectedWithSearch";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    SelectedWithSearch
  },
  data() {
    return {
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"]
    };
  },
  props: {
    xa: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState("quychuan/qcHuyen", ["huyenList", "searchHuyenList"]),
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    hList() {
      if (this.searchHuyenList.length > 0) return this.searchHuyenList;
      else return this.huyenList;
    },
    huyenObj() {
      if (this.xa.belongsToQCHuyen) {
        return this.xa.belongsToQCHuyen[0];
      } else return {};
    },
    caphcList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    },
    capHanhChinhObj() {
      if (this.xa.belongsToSysCapHanhChinh) {
        return this.xa.belongsToSysCapHanhChinh[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("quychuan/qcHuyen", ["getSearchHuyenList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
};
</script>