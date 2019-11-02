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
              v-model="donVi.ma"
              label="Mã đơn vị*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="donVi.ten"
              label="Tên Đơn Vị*"
              prepend-inner-icon="mdi-drag"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="dvList"
              :itemObj="qtDonViObj"
              label="Nhóm đơn vị*"
              icon="mdi-apps"
              @select="donVi.donViChaId = $event.id"
              @search="getSearchDonViList($event)"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="donVi.diaChi"
              label="Địa Chỉ"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="donVi.soDienThoai"
              label="Số Điện Thoại"
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field dense v-model="donVi.email" label="Email" prepend-inner-icon="mdi-gmail"></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12">
            <v-textarea dense v-model="donVi.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-switch dense v-model="donVi.laDonVi" class="ma-1" label="Là đơn vị"></v-switch>
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
    donVi: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "searchDonVi"]),
    dvList() {
      const qtDonVi = this.donVi.belongsToQTDonVi
        ? this.donVi.belongsToQTDonVi
        : [];
      if (this.searchDonVi.length > 0) return qtDonVi.concat(this.searchDonVi);
      else return qtDonVi.concat(this.donViList);
    },

    qtDonViObj() {
      if (this.donVi.belongsToQTDonVi) {
        return this.donVi.belongsToQTDonVi[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("quantri/qtDonVi", ["getSearchDonViList"])
  }
};
</script>