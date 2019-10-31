<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="tinh.ma" label="Mã tỉnh*" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="tinh.ten" label="Tỉnh*" prepend-inner-icon="mdi-drag"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <SelectedWithSearch
              :items="caphcList"
              :itemObj="capHanhChinhObj"
              label="Cấp đơn vị hành chính"
              icon="mdi-apps"
              @select="tinh.sysCapDonViHanhChinh = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-select
              :items="loaidonViHanhChinh"
              v-model="tinh.loaiDonViHanhChinh"
              label="Loại đơn vị hành chính"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="tinh.nongThon" class="ma-1" label="Nông thôn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="tinh.bienGioi" class="ma-1" label="Biên giới"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="tinh.haiDao" class="ma-1" label="Hải đảo"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-switch v-model="tinh.vungDBKhoKhan" class="ma-1" label="Vùng đặc biệt khó khăn"></v-switch>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="12">
            <v-textarea v-model="tinh.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
          <!-- <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="tinh.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="tinh.xoa" class="ma-1" label="Xóa"></v-switch>
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
    tinh: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    },
    data() {
      return {
        loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"]
      };
    }
  },
  computed: {
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    caphcList() {
      if (this.searchCapHanhChinhList.length > 0)
        return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
    },
    capHanhChinhObj() {
      if (this.tinh.belongsToSysCapHanhChinh) {
        return this.tinh.belongsToSysCapHanhChinh[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
};
</script>