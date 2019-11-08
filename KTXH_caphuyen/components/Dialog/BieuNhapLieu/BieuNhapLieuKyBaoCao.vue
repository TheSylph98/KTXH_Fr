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
              v-model="kyBaoCao.ma"
              label="Kí hiệu*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="kyBaoCao.ten"
              label="Tên biểu nhập liệu*"
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
              @select="kyBaoCao.bieuNhapLieuId = $event.id"
              @search="getSearchBieuNhapLieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="kyBaoCaoDataList"
              :itemObj="kyBaoCaoObj"
              label="Kỳ Báo Cáo*"
              icon="mdi-apps"
              @select="kyBaoCao.qlKyBaoCaoId = $event.id"
              @search="getSearchKyBaoCaoList($event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="kyBaoCao.ghiChu"
              label="Ghi Chú"
              prepend-inner-icon="mdi-note"
            ></v-textarea>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="kyBaoCao.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
    kyBaoCao: {
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
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("quanly/qlKyBaoCao", ["kyBaoCaoList", "searchKyBaoCaoList"]),

    bieuNhapLieuList() {
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },

    kyBaoCaoDataList() {
      if (this.searchKyBaoCaoList.length > 0) return this.searchKyBaoCaoList;
      else return this.kyBaoCaoList;
    },

    bieuNhapLieuObj() {
      if (this.kyBaoCao.belongsToBieuNhapLieu) {
        return this.kyBaoCao.belongsToBieuNhapLieu[0];
      } else return {};
    },

    kyBaoCaoObj() {
      if (this.kyBaoCao.belongsToQLKyBaoCao) {
        return this.kyBaoCao.belongsToQLKyBaoCao[0];
      } else return {};
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("quanly/qlKyBaoCao", ["getSearchKyBaoCaoList"])
  }
};
</script>