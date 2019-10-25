<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="donVi.ma" label="Mã đơn vị" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="donVi.ten" label="Tên Đơn Vị*" prepend-inner-icon="mdi-drag"></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="dvList"
              label="Đơn Vị Cha"
              icon="mdi-apps"
              @select="donVi.donViChaId = $event.id"
              @search="getSearchDonViList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="donVi.diaChi"
              label="Địa Chỉ"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="donVi.soDienThoai"
              label="Số Điện Thoại"
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="donVi.email" label="Email" prepend-inner-icon="mdi-gmail"></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12">
            <v-textarea v-model="donVi.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-switch v-model="donVi.laDonVi" class="ma-1" label="Là đơn vị"></v-switch>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="donVi.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="donVi.xoa" class="ma-1" label="Xóa"></v-switch>
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
    donVi: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        donViChaId: 0,
        diaChi: "",
        soDienThoai: "",
        email: "",
        ghiChu: "",
        laDonVi: false
      }
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "searchDonVi"]),
    dvList() {
      if (this.searchDonVi.length > 0) return this.searchDonVi;
      else return this.donViList;
    }
  },
  methods: {
    ...mapActions("quantri/qtDonVi", ["getSearchDonViList"])
  }
};
</script>