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
              label="Kí Hiệu*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="chiTieu.ten"
              label="Tên Biểu Nhập Liệu*"
              prepend-inner-icon="mdi-drag"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <SelectedWithSearch
              :items="bieuNhapLieuList"
              :itemObj="bieuNhapLieuObj"
              label="Biểu nhập liệu*"
              icon="mdi-apps"
              @select="chiTieu.bieuNhapLieuId = $event.id"
              @search="getSearchBieuNhapLieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="ctList"
              :itemObj="chiTieuObj"
              label="Chỉ Tiêu*"
              icon="mdi-apps"
              @select="chiTieu.chiTieuId = $event.id"
              @search="getSearchChiTieuList($event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="chiTieu.ghiChu"
              label="Ghi Chú"
              prepend-inner-icon="mdi-note"
            ></v-textarea>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4" >
            <v-switch dense v-model="kyBaoCao.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
      default: "Thêm Mới"
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  // mounted() {
  //  console.log("bnl", this.bnlList)
  // },

  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("chitieu/chiTieu", ["chiTieuList", "searchChiTieuList"]),
    bieuNhapLieuList() {
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },
    ctList() {
      if (this.searchChiTieuList.length > 0) return this.searchChiTieuList;
      else return this.chiTieuList;
    },
    bieuNhapLieuObj() {
      if (this.chiTieu.belongsToBieuNhapLieu) {
        return this.chiTieu.belongsToBieuNhapLieu[0];
      } else return {};
    },

    chiTieuObj() {
      if (this.chiTieu.belongsToChiTieu) {
        return this.chiTieu.belongsToChiTieu[0];
      } else return {};
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("chitieu/chiTieu", ["getSearchChiTieuList"])
  }
};
</script>