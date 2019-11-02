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
              v-model="chiTieuPhanToChiTiet.ma"
              label="Kí hiệu*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieuPhanToChiTiet.ten"
              label="Tên chỉ tiêu phân tổ chi tiết*"
              prepend-inner-icon="mdi-drag"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <SelectedWithSearch
              :items="ctPhanToList"
              :itemObj="ctPhanToObj"
              label="Chỉ tiêu phân tổ"
              icon="mdi-apps"
              @select="chiTieuPhanToChiTiet.chiTieuPhanToId = $event.id"
              @search="getSearchChiTieuPhanToList($event)"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="chiTieuPhanToChiTiet.ghiChu"
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
    chiTieuPhanToChiTiet: {
      type: Object
    },
    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  computed: {
    ...mapState("chitieu/chiTieuPhanTo", [
      "chiTieuPhanToList",
      "searchChiTieuPhanToList"
    ]),
    ctPhanToList() {
      if (this.searchChiTieuPhanToList.length > 0)
        return this.searchChiTieuPhanToList;
      else return this.chiTieuPhanToList;
    },
    ctPhanToObj() {
      if (this.chiTieuPhanToChiTiet.belongsToChiTieuPhanTo) {
        return this.chiTieuPhanToChiTiet.belongsToChiTieuPhanTo[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("chitieu/chiTieuPhanTo", ["getSearchChiTieuPhanToList"])
  }
};
</script>