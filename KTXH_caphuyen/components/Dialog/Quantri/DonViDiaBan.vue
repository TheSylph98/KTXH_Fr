<template>
  <v-card>
    <v-card-title>Chọn địa bàn - đơn vị {{ donVi.ten }}</v-card-title>
    <v-row :style="{margin: '0 2%'}">
      <v-col cols="6">
        <p>
          <b>Danh sách các địa bàn</b>
        </p>
        <v-treeview
          dense
          :items="items"
          item-text="ten"
          item-key="key"
          rounded
          hoverable
          :load-children="loadChildren"
          expand-icon="mdi-chevron-down"
        >
          <template v-slot:label="{ item }">
            <div>
              <v-btn
                icon
                small
                @click="unChooseNode(item.key)"
                v-if="selectedNode.includes(item.key)"
              >
                <v-icon color="primary">mdi-checkbox-marked</v-icon>
              </v-btn>
              <v-btn
                v-else-if="childrenSelectedNode.includes(item.key)"
                icon
                small
                @click="chooseMinusNode(item.key)"
              >
                <v-icon>mdi-minus-box</v-icon>
              </v-btn>
              <v-btn v-else icon small @click="chooseNode(item.key)">
                <v-icon>mdi-checkbox-blank-outline</v-icon>
              </v-btn>
              <span>{{item.ten}}</span>
            </div>
          </template>
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="5">
        <p>
          <b>Các địa bàn đã chọn</b>
        </p>
        <p v-if="!highestSelectedKey.length">
          <i>Chưa chọn địa bàn nào</i>
        </p>
        <div class="show-choosen-location" v-else>
          <v-treeview
            :open-all="true"
            :items="showChooseLocationList"
            :open="openNode"
            item-text="ten"
            item-key="key"
            dense
          ></v-treeview>
        </div>
      </v-col>
    </v-row>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="blue darken-1" text @click="$emit('close')">Đóng</v-btn>
      <v-btn color="blue darken-1" text @click="clickSave">Lưu</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    donVi: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data: () => ({
    // an attribute is a province key and value of attribute is a list district of this province
    huyenListByTinhId: {},
    xaListByHuyenId: {},
    // includes key of nodes which is displayed choosen
    selectedNode: [],

    // includes key of nodes that some children of node is choosen, but not all
    childrenSelectedNode: [],

    // includes key of nodes which is choosen and all child of node is choosen, but it has highest level
    highestSelectedKey: []
  }),

  computed: {
    ...mapState("quychuan/qcTinh", ["tatCaTinh"]),
    ...mapState("quantri/qtDonViDiaBan", ["donViDiaBanList"]),
    items() {
      return this.tatCaTinh.map(item => {
        const tinh = Object.assign({}, item);
        tinh.key = `T${item.id}`;
        tinh.children = this.huyenListByTinhId[tinh.id]
          ? this.huyenListByTinhId[tinh.id]
          : [];
        return tinh;
      });
    },

    // an attribute is a key of node
    // value of each attribute is an object includes information of node like:
    // - key
    // - id
    // - parent: key of parent node
    // - children: list key of node's children
    nodeListObj() {
      const nodeListObj = {};
      const nodeArray = this.convertToArrayNode(this.items, null);
      nodeArray.forEach(item => {
        nodeListObj[item.key] = item;
      });
      return nodeListObj;
    },

    showChooseLocationList() {
      return this.getHightestNode(this.items, this.highestSelectedKey);
    },

    openNode() {
      return this.getListOpenKey(this.showChooseLocationList);
    }
  },

  watch: {
    async donViDiaBanList(list) {
      if (list.length && !this.highestSelectedKey.length) {
        const diaBanList = list.map(item => {
          const diaBan = Object.assign({}, item);
          if (item.qcTinhId) diaBan.qcTinhId = `T${item.qcTinhId}`;
          if (item.qcHuyenId)
            diaBan.qcHuyenId = `T${item.qcTinhId}H${item.qcHuyenId}`;
          if (item.qcXaId)
            diaBan.qcXaId = `T${item.qcTinhId}H${item.qcHuyenId}X${item.qcXaId}`;
          return diaBan;
        });

        for (let i = 0; i < diaBanList.length; i++) {
          const item = diaBanList[i];
          if (!item.tatCaNutCon) {
            const tinhIndex = this.items.findIndex(
              el => el.key === item.qcTinhId
            );
            await this.loadChildren(this.items[tinhIndex]);
            const huyenList = this.items[tinhIndex].children;
            const huyenIndex = huyenList.findIndex(
              el => el.key === item.qcHuyenId
            );
            await this.loadChildren(huyenList[huyenIndex]);

            if (!this.selectedNode.includes(item.qcXaId))
              this.selectedNode.push(item.qcXaId);
            if (!this.childrenSelectedNode.includes(item.qcHuyenId))
              this.childrenSelectedNode.push(item.qcHuyenId);
            if (!this.childrenSelectedNode.includes(item.qcTinhId))
              this.childrenSelectedNode.push(item.qcTinhId);
            this.highestSelectedKey.push(item.qcXaId);
          } else if (item.qcHuyenId) {
            const tinhIndex = this.items.findIndex(
              el => el.key === item.qcTinhId
            );
            await this.loadChildren(this.items[tinhIndex]);

            if (!this.selectedNode.includes(item.qcHuyenId))
              this.selectedNode.push(item.qcHuyenId);
            if (!this.childrenSelectedNode.includes(item.qcTinhId))
              this.childrenSelectedNode.push(item.qcTinhId);
            this.highestSelectedKey.push(item.qcHuyenId);
          } else {
            this.selectedNode.push(item.qcTinhId);
            this.highestSelectedKey.push(item.qcTinhId);
          }
        }
      }
    }
  },

  async created() {
    if (this.donViDiaBanList.length) {
      const diaBanList = this.donViDiaBanList.map(item => {
        const diaBan = Object.assign({}, item);
        if (item.qcTinhId) diaBan.qcTinhId = `T${item.qcTinhId}`;
        if (item.qcHuyenId)
          diaBan.qcHuyenId = `T${item.qcTinhId}H${item.qcHuyenId}`;
        if (item.qcXaId)
          diaBan.qcXaId = `T${item.qcTinhId}H${item.qcHuyenId}X${item.qcXaId}`;
        return diaBan;
      });

      for (let i = 0; i < diaBanList.length; i++) {
        const item = diaBanList[i];
        if (!item.tatCaNutCon) {
          const tinhIndex = this.items.findIndex(
            el => el.key === item.qcTinhId
          );
          await this.loadChildren(this.items[tinhIndex]);
          const huyenList = this.items[tinhIndex].children;
          const huyenIndex = huyenList.findIndex(
            el => el.key === item.qcHuyenId
          );
          await this.loadChildren(huyenList[huyenIndex]);

          if (!this.selectedNode.includes(item.qcXaId))
            this.selectedNode.push(item.qcXaId);
          if (!this.childrenSelectedNode.includes(item.qcHuyenId))
            this.childrenSelectedNode.push(item.qcHuyenId);
          if (!this.childrenSelectedNode.includes(item.qcTinhId))
            this.childrenSelectedNode.push(item.qcTinhId);
          this.highestSelectedKey.push(item.qcXaId);
        } else if (item.qcHuyenId) {
          const tinhIndex = this.items.findIndex(
            el => el.key === item.qcTinhId
          );
          await this.loadChildren(this.items[tinhIndex]);

          if (!this.selectedNode.includes(item.qcHuyenId))
            this.selectedNode.push(item.qcHuyenId);
          if (!this.childrenSelectedNode.includes(item.qcTinhId))
            this.childrenSelectedNode.push(item.qcTinhId);
          this.highestSelectedKey.push(item.qcHuyenId);
        } else {
          this.selectedNode.push(item.qcTinhId);
          this.highestSelectedKey.push(item.qcTinhId);
        }
      }
    }
  },

  methods: {
    ...mapActions("quychuan/qcHuyen", ["getHuyenListByTinhId"]),
    ...mapActions("quychuan/qcXa", ["getXaListByHuyenId"]),
    ...mapActions("quantri/qtDonViDiaBan", ["getDonViDiaBanListByDonViId"]),

    // return basic information (see in nodeListObj) of node
    // from an original node in treeview has many attributes
    getNode(node, parentKey) {
      let children = null;
      if (node.children) {
        children = node.children.length
          ? node.children.map(item => item.key)
          : [];
      }
      return {
        key: node.key,
        id: node.id,
        name: node.ten,
        children: children,
        parent: parentKey
      };
    },

    convertToTreeFromKey(key) {
      const tree = {};
      const node = this.nodeListObj[key];
      if (!node.parent) {
        tree[key] = {
          name: node.name,
          children: {}
        };

        return tree;
      }

      tree = this.convertToArrayNode(node.parent);
      tree.children[key] = {
        name: node.name,
        children: {}
      };
    },

    // convert treeview to node array
    convertToArrayNode(treeNode, parentKey) {
      const nodeArray = [];
      if (!treeNode) return [];

      for (let i = 0; i < treeNode.length; i++) {
        // push node into result
        nodeArray.push(this.getNode(treeNode[i], parentKey));

        // if node hasn't children, do nothing
        if (!treeNode[i].children);
        else if (treeNode[i].children.length) {
          // else, convert children node to array and push them into result
          nodeArray.push(
            ...this.convertToArrayNode(treeNode[i].children, treeNode[i].key)
          );
        }
      }

      return nodeArray;
    },

    // @params: the key want to get all descendant key (con cháu)
    getTreeKeyFromNode(key) {
      const keyArray = [];
      const children = this.nodeListObj[key].children
        ? this.nodeListObj[key].children
        : [];

      for (let i = 0; i < children.length; i++) {
        keyArray.push(...this.getTreeKeyFromNode(children[i]));
      }

      keyArray.push(key);

      return keyArray;
    },

    getListOpenKey(nodeArray) {
      if (!nodeArray) return [];
      if (!nodeArray.length) return [];
      const openNodeList = nodeArray.filter(item => item.children);
      const keyList = openNodeList.map(item => item.key);
      for (let i = 0; i < openNodeList.length; i++) {
        keyList.push(...this.getListOpenKey(openNodeList[i].children));
      }

      return keyList;
    },

    addParentKey(key) {
      const parentKey = this.nodeListObj[key].parent;
      if (parentKey !== null) {
        const parentNode = this.nodeListObj[parentKey];
        if (
          parentNode.children.every(value => this.selectedNode.includes(value))
        ) {
          this.selectedNode.push(parentKey);
          this.addParentKey(parentKey);
        } else {
          this.childrenSelectedNode.push(parentKey);
          let _parentKey = parentNode.parent;
          while (_parentKey !== null) {
            if (!this.childrenSelectedNode.includes(_parentKey)) {
              this.childrenSelectedNode.push(_parentKey);
            }
            _parentKey = this.nodeListObj[_parentKey].parent;
          }
        }
      }
    },

    getHightestKey(key) {
      const parentKey = this.nodeListObj[key].parent;
      if (parentKey !== null) {
        const parentNode = this.nodeListObj[parentKey];
        if (
          parentNode.children.every(value => this.selectedNode.includes(value))
        ) {
          return this.getHightestKey(parentKey);
        } else return key;
      }
      return key;
    },

    getHightestNode(nodeArray, highestArray) {
      let highestNodeList = [];
      if (!nodeArray) return [];
      if (!nodeArray.length) return [];
      if (!highestArray.length) return [];

      for (let i = 0; i < nodeArray.length; i++) {
        if (highestArray.includes(nodeArray[i].key)) {
          const children = nodeArray[i].children;
          const key = `S-${nodeArray[i].key}`;
          if (children) {
            highestNodeList.push({
              ...nodeArray[i],
              children: [],
              key: key
            });
          } else {
            highestNodeList.push({
              ...nodeArray[i],
              key: key
            });
          }
        } else if (nodeArray[i].children) {
          const children = this.getHightestNode(
            nodeArray[i].children,
            highestArray
          );
          if (children.length > 0) {
            const node = { ...nodeArray[i], children: children };
            highestNodeList.push(node);
          }
        }
      }


      return highestNodeList;
    },

    chooseNode(key) {
      this.selectedNode.push(...this.getTreeKeyFromNode(key));
      this.addParentKey(key);

      const highestKey = this.getHightestKey(key);
      if (highestKey !== key) {
        const highestChildKey = this.getTreeKeyFromNode(highestKey);
        this.highestSelectedKey = this.highestSelectedKey.filter(
          item => !highestChildKey.includes(item)
        );
        this.highestSelectedKey.push(highestKey);
      } else {
        const highestChildKey = this.getTreeKeyFromNode(key);
        this.highestSelectedKey = this.highestSelectedKey.filter(
          item => !highestChildKey.includes(item)
        );
        this.highestSelectedKey.push(key);
      }
    },

    chooseMinusNode(key) {
      const keyNodeList = this.getTreeKeyFromNode(key);
      this.selectedNode = this.selectedNode.filter(
        item => !keyNodeList.includes(item)
      );
      this.selectedNode.push(...keyNodeList);
      this.childrenSelectedNode = this.childrenSelectedNode.filter(
        item => !keyNodeList.includes(item)
      );

      const highestKey = this.getHightestKey(key);
      const highestChildKey = this.getTreeKeyFromNode(highestKey);
      this.highestSelectedKey = this.highestSelectedKey.filter(
        item => !highestChildKey.includes(item)
      );
      this.highestSelectedKey.push(highestKey);
    },

    unChooseNode(key) {
      // init change array
      let selectedNode = [].concat(this.selectedNode);
      let childrenSelectedNode = [].concat(this.childrenSelectedNode);
      let highestSelectedKey = [].concat(this.highestSelectedKey);

      // get children key (includes this key) list from node
      const keyNodeList = this.getTreeKeyFromNode(key);
      // remove them in selected node
      selectedNode = selectedNode.filter(item => !keyNodeList.includes(item));

      // find parent key
      let parentKey = this.nodeListObj[key].parent;
      // set removeKey
      let removeKey = key;

      // if parent key is null, remove it from highest key list
      if (parentKey === null) {
        highestSelectedKey = highestSelectedKey.filter(item => item !== key);
      }

      // else, do the next step
      while (parentKey) {
        // get all child of parent key (include parent key)
        const childList = this.nodeListObj[parentKey].children;

        // if a key in child list appear in selected node, check parent key in childrenSelectedNode,
        // if in, do nothing
        // else, push it into list
        if (childList.some(value => selectedNode.includes(value))) {
          if (!childrenSelectedNode.includes(parentKey)) {
            childrenSelectedNode.push(parentKey);
          }
        } else {
          // else remove parent key in childrenSelectedNode
          childrenSelectedNode = childrenSelectedNode.filter(
            item => item !== parentKey
          );
        }

        // if parent key is in selectedNode
        if (selectedNode.includes(parentKey)) {
          // remove it
          selectedNode = selectedNode.filter(
            item => item !== parentKey && item !== removeKey
          );

          // and add children in highestSelectedKey, but not remove key
          highestSelectedKey.push(...childList);

          highestSelectedKey = highestSelectedKey.filter(
            item => item !== parentKey && item !== removeKey
          );
        } else {
          highestSelectedKey = highestSelectedKey.filter(
            item => item !== removeKey
          );
        }

        // loop with parent key
        removeKey = parentKey;
        parentKey = this.nodeListObj[parentKey].parent;
      }

      this.selectedNode = selectedNode;
      this.childrenSelectedNode = childrenSelectedNode;
      this.highestSelectedKey = highestSelectedKey;
    },

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

        if (this.selectedNode.includes(node.key)) {
          this.selectedNode.push(...xaList.map(item => item.key));
        }
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

          if (this.selectedNode.includes(node.key)) {
            this.selectedNode.push(...huyenList.map(item => item.key));
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    clickSave() {
      const list = this.highestSelectedKey.map(item => {
        const node = this.nodeListObj[item];
        let result = {};
        if (!node.parent) {
          result = {
            qcTinhId: node.id,
            tatCaNutCon: true
          };
        } else if (!node.children) {
          const huyenKey = this.nodeListObj[item].parent;
          const huyenNode = this.nodeListObj[huyenKey];
          const tinhKey = this.nodeListObj[huyenNode.key].parent;
          const tinhNode = this.nodeListObj[tinhKey];
          result = {
            qcTinhId: tinhNode.id,
            qcHuyenId: huyenNode.id,
            qcXaId: node.id,
            tatCaNutCon: false
          };
        } else {
          const tinhKey = this.nodeListObj[item].parent;
          const tinhNode = this.nodeListObj[tinhKey];

          return {
            qcTinhId: tinhNode.id,
            qcHuyenId: node.id,
            tatCaNutCon: true
          };
        }
        return result;
      });

      const data = {
        qtDonViId: this.donVi.id,
        listID: list
      };
      this.$emit("save", data);
    }
  }
};
</script>