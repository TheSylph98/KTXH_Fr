<template>
  <div>
    <v-row>
      <v-col>
        <v-treeview
          dense
          :items="items"
          item-text="ten"
          item-key="key"
          v-model="tree"
          selectable
          selection-type="all"
          return-object
          rounded
          hoverable
          :load-children="loadChildren"
          expand-icon="mdi-chevron-down"
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="6">
        <template v-if="!tree.length">No nodes selected.</template>
        <template v-else>
          <p>Selected</p>
          <div v-for="node in tree" :key="`S-${node.key}`">{{ node.ten }}</div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";

export default {
  data: () => ({
    selectionType: "all",
    tree: [],
    open: [],
    active: [],
    tinhList: [],
    huyenListByTinhId: {},
    xaListByHuyenId: {}
  }),

  computed: {
    ...mapState("quychuan/qcTinh", ["tatCaTinh"]),
    items() {
      let items;
      return this.tatCaTinh.map(item => {
        const tinh = Object.assign({}, item);
        tinh.key = `T${item.id}`;
        tinh.children = this.huyenListByTinhId[tinh.id]
          ? this.huyenListByTinhId[tinh.id]
          : [];
        return tinh;
      });
    }
  },

  methods: {
    ...mapActions("quychuan/qcHuyen", ["getHuyenListByTinhId"]),
    ...mapActions("quychuan/qcXa", ["getXaListByHuyenId"]),

    async loadChildren(node) {
      if (node.belongsToQCTinh) {
        const data = await this.getXaListByHuyenId({ id: node.id });
        const xaList = data.map(item => {
          const xa = Object.assign({}, item);
          xa.key = `T${node.belongsToQCTinh.id}H${node.id}X${xa.id}`;
          return xa;
        });

        const obj = {};
        obj[node.id] = xaList;

        const index = this.huyenListByTinhId[node.belongsToQCTinh.id].findIndex(
          item => item.id === node.id
        );

        this.huyenListByTinhId[node.belongsToQCTinh.id][
          index
        ].children = xaList;
      } else {
        try {
          const data = await this.getHuyenListByTinhId({ id: node.id });
          const huyenList = data.map(item => {
            const huyen = Object.assign({}, item);
            huyen.key = `T${node.id}H${huyen.id}`;
            if (!huyen.children) huyen.children = [];
            return huyen;
          });

          const obj = {};
          obj[node.id] = huyenList;

          this.huyenListByTinhId = { ...this.huyenListByTinhId, ...obj };
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>