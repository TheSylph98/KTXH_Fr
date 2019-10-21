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
              @select="huyen.qcTinhId = $event.id"
              @search="getSearchTinhList($event)"
              />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="huyen.ma" label="Mã huyện"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="huyen.ten" label="Huyện"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" md="8">
            <v-select
              :items="donViHanhChinh"
              v-model="huyen.sysCapDonViHanhChinhId"
              label="Cấp đơn vị hành chính"
              outlined
            ></v-select>
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
            <v-switch v-model="huyen.nongThon" class="ma-1" label="Thành Thị - Nông thôn"></v-switch>
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
            <v-textarea v-model="huyen.ghiChu" label="Ghi Chú"></v-textarea>
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
  props: {
    huyen: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        qcTinhId: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: 1,
        bienGioi: 0,
        haiDao: 0,
        vungDBKhoKhan: 0,
        ghiChu: ""
      }
    },
    donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
    loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  computed: {
    ...mapState("quychuan/tinh", ["tinhList","searchTinhList"]),
    tList() {
      if (this.searchTinhList.length > 0) return this.searchTinhList;
      else return this.tinhList;
      },
    },
  methods: {
    ...mapActions("quychuan/tinh", ["getSearchTinhList"])
  }
};
</script>