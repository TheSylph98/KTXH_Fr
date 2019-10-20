<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="kyBaoCao.ma" label="Kí hiệu"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-text-field v-model="kyBaoCao.ten" label="Tên biểu nhập liệu"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <SelectedWithSearch
              :items="bieuNhapLieuList"
              label="Biểu nhập liệu"
              @select="kyBaoCao.bieuNhapLieuId = $event.id"
              @search="getSearchBieuNhapLieuList($event)"
            />
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="kyBaoCaoList"
              label="Ky Bao Cao"
              @select="kyBaoCao.qlKyBaoCaoId = $event.id"
              @search="getSearchKyBaoCaoList($event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <v-textarea v-model="kyBaoCao.ghiChu" label="Ghi Chú"></v-textarea>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="8">
            <v-switch v-model="kyBaoCao.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-switch v-model="kyBaoCao.xoa" class="ma-1" label="Xóa"></v-switch>
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
    kyBaoCao: {
      type: Object,
      default:
         {
        ma: "",
        ten: "",
        bieuNhapLieuId: 0,
        qlKyBaoCaoId: 0,
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
  computed: {
    ...mapState("bieunhaplieu/bieuNhapLieu", ["bnlList", "searchBnlList"]),
    ...mapState("quanly/qlKyBaoCao", ["kyBaoCaoList","searchKyBaoCaoList"]),
    bieuNhapLieuList() {
      //console.log(this.bnlList)
      if (this.searchBnlList.length > 0) return this.searchBnlList;
      else return this.bnlList;
    },
    kyBaoCaoList() {
      if (this.searchKyBaoCaoList.length > 0) return this.searchKyBaoCaoList;
      else return this.kyBaoCaoList;
    }
  },

  methods: {
    ...mapActions("bieunhaplieu/bieuNhapLieu", ["getSearchBieuNhapLieuList"]),
    ...mapActions("quanly/qlKyBaoCao", ["getSearchKyBaoCaoList"])
  }
};
</script>