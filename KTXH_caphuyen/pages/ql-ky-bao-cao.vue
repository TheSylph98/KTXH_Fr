<template>
  <v-data-table :headers="headers" :items="qlKyBaoCaoData" :items-per-page="5" class="elevation-1">
    <template v-for="(el, index) in Object.keys(search)" :slot="`item.${el}`" slot-scope="row">
      <div v-if="row.item[el]">{{ row.item[el] }}</div>
      <div v-else>
        <v-text-field>
          <template slot="append-outer">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
              </template>
              <v-list dense>
                <v-list-item v-for="(item, index) in operators" :key="index" @click>
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </div>
    </template>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </v-data-table>
</template>

<script>
import { operators } from "../util/operators";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      operators: operators,
      search: {
        ma: {
          value: "",
          operator: ""
        },
        ten: {
          value: "",
          operator: ""
        },
        ngayMo: {
          value: "",
          operator: ""
        },
        ngayDong: {
          value: "",
          operator: ""
        },
        ghiChu: {
          value: "",
          operator: ""
        }
      },
      headers: [
        {
          text: "Mã",
          align: "left",
          sortable: false,
          divider: true,
          value: "ma"
        },
        { text: "Kỳ Báo Cáo", value: "ten" },
        { text: "Ngày Mở", value: "ngayMo" },
        { text: "Ngày Đóng", value: "ngayDong" },
        { text: "Ghi chú", value: "ghiChu" },
        { text: "Operator", value: "operator", sortable: false }
      ]
    };
  },

  computed: {
    ...mapState("qlKyBaoCao", ["kyBaoCaoList", "pagination"]),
    qlKyBaoCaoData() {
      return [{ search: true }].concat(this.kyBaoCaoList);
    }
  },

  asyncData({ store }) {
    store.dispatch("qlKyBaoCao/getKyBaoCaoList");
  },

  methods: {
    ...mapActions("qlKyBaoCao", [
      "getKyBaoCaoList",
      "addKyBaoCao",
      "updateKyBaoCao",
      "deleteKyBaoCao",
      "restoreKyBaoCao"
    ])
  }
};
</script>