<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.ma" label="Kí Hiệu*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="truongNhapLieu.ten" label="Tên Biểu Nhập Liệu*"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <SelectedWithSearch
                  :items="bieuNhapLieuList"
                  label="Biểu nhập liệu"
                  @select="truongNhapLieu.bieuNhapLieuId = $event.id"
                  @search="getSearchBieuNhapLieuList($event)"
                />
              </v-col>
              <v-col cols="6">
                <SelectedWithSearch
                  :items="tnlList"
                  label="Trường nhập liệu"
                  @select="truongNhapLieu.truongNhapLieuId = $event.id"
                  @search="getSearchTruongNhaplieuList($event)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="truongNhapLieu.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="truongNhapLieu.hieuLuc" class="ma-1" label="Hiệu Lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="truongNhapLieu.xoa" class="ma-1" label="Xóa"></v-switch>
              </v-col> -->
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
      type: Object,
      default: {
        ma: "",
        ten: "",
        bieuNhapLieuId: 1,
        truongNhapLieuId: 1,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    },

    formTitle: {
      type: String,
      default: "Thêm mới biểu nhập liệu trường nhập liệu"
    }
  },
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("truongNhapLieu", ["truongnhaplieuList","searchTruongNhapLieuList"]),
    bieuNhapLieuList() {
      //console.log(this.bnlList)
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },
    tnlList() {
      if (this.searchTruongNhapLieuList.length > 0) return this.searchTruongNhapLieuList;
      else return this.truongnhaplieuList;
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("truongNhapLieu", ["getSearchTruongNhaplieuList"]),
  }
}
</script>