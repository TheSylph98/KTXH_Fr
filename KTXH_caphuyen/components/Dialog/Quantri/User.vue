<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field dense v-model="user.ma" label="Mã" prepend-inner-icon="mdi-codepen"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="user.ten"
              label="Họ và tên*"
              prepend-inner-icon="mdi-account-box"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="user.matKhau"
              label="Mật khẩu*"
              prepend-inner-icon="mdi-spellcheck"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="user.soDienThoai"
              label="Số điện thoại"
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field dense v-model="user.email" label="Email" prepend-inner-icon="mdi-gmail"></v-text-field>
          </v-col>
          <v-col cols="6">
            <SelectedWithSearch
              :items="dvList"
              :itemObj="qtDonViObj"
              label="Đơn vị*"
              icon="mdi-apps"
              @select="user.qtDonViId = $event.id"
              @search="getSearchDonViList($event)"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea dense v-model="user.ghiChu" label="Ghi Chú" prepend-inner-icon="mdi-note"></v-textarea>
          </v-col>
           <v-col v-if="isUpdate" class="d-flex" cols="4" >
            <v-switch dense v-model="user.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
    user: {
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
  computed: {
    ...mapState("quantri/qtDonVi", ["donViList", "searchDonVi"]),
    dvList() {
      if (this.searchDonVi.length > 0) return this.searchDonVi;
      else return this.donViList;
    },
    qtDonViObj() {
      if (this.user.belongsToQTDonVi) {
        return this.user.belongsToQTDonVi[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("quantri/qtDonVi", ["getSearchDonViList"])
  }
};
</script>