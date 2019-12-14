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
              v-model="tacNhan.ma"
              label="Mã tác nhân"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-codepen"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              v-model="tacNhan.ten"
              label="Tên tác nhân"
              :disabled="!isWatch"
              :rules="[v => !!v || 'Không được để trống']"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <SelectedWithSearch
              :items="capHanhChinhList"
              :itemObj="capHanhchinhObj"
              label="Cấp hành chính*"
              :disabled="!isWatch"
              icon="mdi-apps"
              @select="tacNhan.sysCapHanhChinhId = $event.id"
              @search="getSearchCapHanhChinhList($event)"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              dense
              v-model="tacNhan.ghiChu"
              label="Chức năng, Nhiệm vụ"
              :disabled="!isWatch"
              prepend-inner-icon="mdi-star"
            ></v-textarea>
          </v-col>
          <v-col v-if="isUpdate" class="d-flex" cols="4">
            <v-switch dense v-model="tacNhan.hieuLuc" :disabled="!isWatch" class="ma-1" label="Hiệu lực"></v-switch>
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
    tacNhan: {
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
    ...mapState("sys/sysCapHanhChinh", [
      "caphanhchinhList",
      "searchCapHanhChinhList"
    ]),
    capHanhChinhList() {
      const sysCapHanhChinh = this.tacNhan.belongsToSysCapHanhChinh
        ? this.tacNhan.belongsToSysCapHanhChinh
        : [];
      if (this.searchCapHanhChinhList.length > 0)
        return sysCapHanhChinh.concat(this.searchCapHanhChinhList);
      else return sysCapHanhChinh.concat(this.caphanhchinhList);
    },

    capHanhchinhObj() {
      if (this.tacNhan.belongsToSysCapHanhChinh) {
        return this.tacNhan.belongsToSysCapHanhChinh[0];
      } else return {};
    }
  },
  methods: {
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
};
</script>