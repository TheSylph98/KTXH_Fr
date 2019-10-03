<template>
  <v-data-table :headers="headers" :items="kyBaoCaoList" :items-per-page="5" class="elevation-1">
    <!-- <template v-for="(el, index) in Object.keys(search)" :slot="`header.${el}`">
      <div>
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
    </template>-->
    <template slot="body.prepend" class="search">
      <tr>
        <td v-for="(item, index) in search" :key="index" :class="getClass(index)">
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
        </td>
        <td></td>
      </tr>
    </template>
    <template slot="item.operator" width="150">
      <div>
        <v-icon>mdi-square-edit-outline</v-icon>
        <v-icon>mdi-delete</v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { stringperators } from "../util/operators";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      kyBaoCao: {},
      operators: stringOperators,
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
        { text: "Thao tác", value: "operator", sortable: false }
      ]
    };
  },

  computed: {
    ...mapState("qlKyBaoCao", ["kyBaoCaoList", "pagination"])
  },

  // asyncData({ store }) {
  //   store.dispatch("qlKyBaoCao/getKyBaoCaoList");
  // },

  created() {
    this.getKyBaoCaoList();
  },

  methods: {
    ...mapActions("qlKyBaoCao", [
      "getKyBaoCaoList",
      "getKyBaoCao",
      "addKyBaoCao",
      "updateKyBaoCao",
      "deleteKyBaoCao",
      "restoreKyBaoCao"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
}
</style>