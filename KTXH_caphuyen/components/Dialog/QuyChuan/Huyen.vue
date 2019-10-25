<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <SelectedWithSearch
              :items="tList"
              label="Tỉnh"
              icon="mdi-map-marker"
              @select="huyen.qcTinhId = $event.id"
              @search="getSearchTinhList($event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="huyen.ma" label="Mã huyện" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="7">
            <v-text-field v-model="huyen.ten" label="Huyện" prepend-inner-icon="mdi-drag"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <SelectedWithSearch
              :items="caphcList"
              label="Cấp đơn vị hành chính"
              icon="mdi-apps"
              @select="huyen.sysCapDonViHanhChinh = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-select
              :items="loaidonViHanhChinh"
              v-model="huyen.loaiDonViHanhChinh"
              label="Loại đơn vị hành chính"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="huyen.nongThon" class="ma-1" label="Nông thôn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="huyen.bienGioi" class="ma-1" label="Biên giới"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="huyen.haiDao" class="ma-1" label="Hải đảo"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="huyen.vungDBKhoKhan" class="ma-1" label="Vùng đặc biệt khó khăn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="12">
            <v-textarea v-model="huyen.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
          <!-- <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="huyen.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="huyen.xoa" class="ma-1" label="Xóa"></v-switch>
          </v-col>-->
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
    huyen: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  computed: {
    ...mapState("quychuan/qcTinh", ["tinhList", "searchTinhList"]),
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    tList() {
      if (this.searchTinhList.length > 0) return this.searchTinhList;
      else return this.tinhList;
    },
    caphcList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    }
  },
  methods: {
    ...mapActions("quychuan/qcTinh", ["getSearchTinhList"]),
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
};
</script>