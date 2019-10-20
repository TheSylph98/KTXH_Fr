<template>
    <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="tacNhan.ma" label="Mã"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="tacNhan.ten" label="Tên tác nhân"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <SelectedWithSearch
                :items="capHanhChinhList"
                label="Cấp hành chính"
                @select="tacNhan.sysCapHanhChinhId = $event.id"
                @search="getSearchCapHanhChinhList($event)"
                />
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="tacNhan.ghiChu" label="Chức năng, Nhiệm vụ"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="8">
                <v-switch v-model="tacNhan.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="tacNhan.xoa" class="ma-1" label="Xóa"></v-switch>
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
    tacNhan: {
      type: Object,
      default: {
        ma: "",
        ten: "",
        sysCapHanhChinhId: 0,
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
    ...mapState("sys/sysCapHanhChinh", ["caphanhchinhList","searchCapHanhChinhList"]),
    capHanhChinhList() {
    //console.log(this.bnlList)
      if (this.searchCapHanhChinhList.length > 0) return this.searchCapHanhChinhList;
      else return this.caphanhchinhList;
      },
  },
  methods: {
    ...mapActions("sys/sysCapHanhChinh", ["getSearchCapHanhChinhList"])
  }
}
</script>