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
              v-model="truongNhapLieu.ma"
              value="truongNhapLieu.ma"
              label="Kí Hiệu*"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="truongNhapLieu.ten"
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
              label="Biểu nhập liệu"
              icon="mdi-apps"
              @select="truongNhapLieu.bieuNhapLieuId = $event.id"
              @search="getSearchBieuNhapLieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="tnlList"
              :itemObj="truongNhapLieuObj"
              label="Trường nhập liệu"
              icon="mdi-apps"
              @select="truongNhapLieu.truongNhapLieuId = $event.id"
              @search="getSearchTruongNhaplieuList($event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="truongNhapLieu.ghiChu"
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
    truongNhapLieu: {
      type: Object
    },

    formTitle: {
      type: String,
      default: "Thêm mới biểu nhập liệu trường nhập liệu"
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("truongNhapLieu", [
      "truongnhaplieuList",
      "searchTruongNhapLieuList"
    ]),
    bieuNhapLieuList() {
      //console.log(this.bnlList)
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },

    tnlList() {
      if (this.searchTruongNhapLieuList.length > 0)
        return this.searchTruongNhapLieuList;
      else return this.truongnhaplieuList;
    },

    bieuNhapLieuObj() {
      if (this.truongNhapLieu.belongsToBieuNhapLieu) {
        return this.truongNhapLieu.belongsToBieuNhapLieu[0];
      } else return {};
    },

    truongNhapLieuObj() {
      if (this.truongNhapLieu.belongsToTruongNhapLieu) {
        return this.truongNhapLieu.belongsToTruongNhapLieu[0];
      } else return {};
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("truongNhapLieu", ["getSearchTruongNhaplieuList"])
  }
};
</script>