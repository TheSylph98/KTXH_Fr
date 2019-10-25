<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="chiTieu.ma" label="Kí Hiệu*" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
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
              label="Biểu nhập liệu"
              icon="mdi-apps"
              @select="chiTieu.bieuNhapLieuId = $event.id"
              @search="getSearchBieuNhapLieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="ctList"
              label="Chỉ Tiêu"
              icon="mdi-apps"
              @select="chiTieu.chiTieuId = $event.id"
              @search="getSearchChiTieuList($event)"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="6">
            <v-switch v-model="chiTieu.hieuLuc" class="ma-1" label="Hiệu Lực"></v-switch>
          </v-col>
           <v-col cols="6">
            <v-switch v-model="chiTieu.xoa" class="ma-1" label="Xóa"></v-switch>
          </v-col>
        </v-row>-->
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="chiTieu.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
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
      type: Object,
      default: {
        ma: "",
        ten: "",
        bieuNhapLieuId: 1,
        chiTieuId: 1,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },

    formTitle: {
      type: String,
      default: "Thêm Mới"
    }
  },
  // mounted() {
  //  console.log("bnl", this.bnlList)
  // },

  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("chitieu/chiTieu", ["chiTieuList", "searchChiTieuList"]),
    bieuNhapLieuList() {
      //console.log(this.bnlList)
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },
    ctList() {
      if (this.searchChiTieuList.length > 0) return this.searchChiTieuList;
      else return this.chiTieuList;
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("chitieu/chiTieu", ["getSearchChiTieuList"])
  }
};
</script>