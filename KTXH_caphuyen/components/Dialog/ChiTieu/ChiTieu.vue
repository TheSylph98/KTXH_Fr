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
              v-model="chiTieu.ma"
              label="Mã chỉ tiêu*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieu.ten"
              label="Tên chỉ tiêu*"
              prepend-inner-icon="mdi-drag"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="capNhapLieuList"
              :itemObj="capNhapLieuObj"
              label="Cấp nhập liệu*"
              icon="mdi-apps"
              @select="chiTieu.capNhapLieuId = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="capTongHopList"
              :itemObj="capTongHopObj"
              label="Cấp tổng hợp*"
              icon="mdi-apps"
              @select="chiTieu.capTongHopId = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="ctNhomList"
              :itemObj="ctNhomObj"
              label="Chỉ tiêu nhóm*"
              icon="mdi-apps"
              @select="chiTieu.chiTieuNhomId = $event.id"
              @search="getSearchChiTieuNhomList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="ctPhanToList"
              :itemObj="ctPhanToObj"
              label="Chỉ tiêu phân tổ*"
              icon="mdi-apps"
              @select="chiTieu.chiTieuPhanToId = $event.id"
              @search="getSearchChiTieuPhanToList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="chiTieuChaList"
              :itemObj="ctChaObj"
              label="Chỉ tiêu cha"
              icon="mdi-apps"
              @select="chiTieu.chiTieuChaId = $event.id"
              @search="getSearchChiTieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieu.donViTinh"
              label="Đơn vị tính*"
              prepend-inner-icon="mdi-resize-bottom-right"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch
              dense
              v-model="chiTieu.congDonTuDuoiLen"
              class="ma-1"
              label="Cộng từ dưới lên"
            ></v-switch>
          </v-col>
          <v-col cols="6">
            <v-switch
              dense
              v-model="chiTieu.congTheoMa"
              class="ma-1"
              label="Cộng theo mã"
              prepend-inner-icon="mdi-plus-box"
            ></v-switch>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-textarea
              dense
              v-model="chiTieu.congThucCong"
              label="Cộng Công Thức*"
              prepend-inner-icon="mdi-plus-circle"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-switch
              dense
              v-model="chiTieu.coPhanToKhong"
              class="ma-1"
              label="Có phân tổ hay không?"
            ></v-switch>
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-switch dense v-model="chiTieu.tinhPhanTram" class="ma-1" label="Tính Phần Trăm"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-text-field
              dense
              v-model="chiTieu.tuSo"
              label="Tử Số"
              prepend-inner-icon="mdi-percent"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-text-field
              dense
              v-model="chiTieu.mauSo"
              label="Mẫu Số"
              prepend-inner-icon="mdi-percent"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-textarea
              dense
              v-model="chiTieu.ghiChu"
              label="Ghi Chú"
              prepend-inner-icon="mdi-note"
            ></v-textarea>
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
  props: {
    chiTieu: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm mới chỉ tiêu"
    }
  },
  computed: {
    ...mapState("chitieu/chiTieuNhom", [
      "chiTieuNhomList",
      "searchChiTieuNhomList"
    ]),
    ...mapState("chitieu/chiTieuPhanTo", [
      "chiTieuPhanToList",
      "searchChiTieuPhanToList"
    ]),
    ...mapState("chitieu/chiTieu", ["chiTieuList", "searchChiTieuList"]),
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    capNhapLieuList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    },

    capNhapLieuObj() {
      if (this.chiTieu.belongsToSysCapHanhChinh1) {
        return this.chiTieu.belongsToSysCapHanhChinh1[0];
      } else return {};
    },

    capTongHopList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    },

    capTongHopObj() {
      if (this.chiTieu.belongsToSysCapHanhChinh2) {
        return this.chiTieu.belongsToSysCapHanhChinh2[0];
      } else return {};
    },

    ctNhomList() {
      if (this.searchChiTieuNhomList.length > 0)
        return this.searchChiTieuNhomList;
      else return this.chiTieuNhomList;
    },

    ctNhomObj() {
      if (this.chiTieu.belongsToChiTieuNhom) {
        return this.chiTieu.belongsToChiTieuNhom[0];
      } else return {};
    },

    ctPhanToList() {
      if (this.searchChiTieuPhanToList.length > 0)
        return this.searchChiTieuPhanToList;
      else return this.chiTieuPhanToList;
    },

    ctPhanToObj() {
      if (this.chiTieu.belongsToChiTieuPhanTo) {
        return this.chiTieu.belongsToChiTieuPhanTo[0];
      } else return {};
    },

    chiTieuChaList() {
      if (this.searchChiTieuList.length > 0) return this.searchChiTieuList;
      else return this.chiTieuList;
    },

    ctChaObj() {
      if (this.chiTieu.belongsToChiTieuCha) {
        return this.chiTieu.belongsToChiTieuCha[0];
      } else return {};
    }
  },

  methods: {
    ...mapActions("chitieu/chiTieuNhom", ["getSearchChiTieuNhomList"]),
    ...mapActions("chitieu/chiTieuPhanTo", ["getSearchChiTieuPhanToList"]),
    ...mapActions("chitieu/chiTieu", ["getSearchChiTieuList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
};
</script>