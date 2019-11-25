<template>
  <v-card>
    <v-card-title>Chọn địa bàn - đơn vị {{ donVi.ten }}</v-card-title>
    <v-row :style="{margin: '0 2%'}">
      <v-col max-width="500px">
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
              {{item.ten}}
            </div>
          </template>
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="6">
        <p>
          <b>Các địa bàn đã chọn</b>
        </p>
        <p v-if="!highestSelectedKey.length">
          <i>Chưa chọn địa bàn nào</i>
        </p>
        <div v-else>
          <p v-for="(item, index) in highestSelectedKey" :key="index">{{item}}</p>
        </div>
      </v-col>
    </v-row>
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
    }
  },

  methods: {
    ...mapActions("quychuan/qcHuyen", ["getHuyenListByTinhId"]),
    ...mapActions("quychuan/qcXa", ["getXaListByHuyenId"]),

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
      const children = this.nodeListObj[key].children;

      for (let i = 0; i < children.length; i++) {
        //
        if (this.nodeListObj[key].children.length) {
          keyArray.push(...this.getTreeKeyFromNode(children[i]));
        } else {
          keyArray.push(...children.key);
        }
      }
      keyArray.push(key);

      return keyArray;
    },

    addParentKey(key) {
      console.log("key", key);
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
            console.log("Pkey1", _parentKey);
            if (!this.childrenSelectedNode.includes(_parentKey)) {
              this.childrenSelectedNode.push(_parentKey);
            }
            _parentKey = this.nodeListObj[_parentKey].parent;
            console.log("Pkey1", _parentKey);
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

    chooseNode(key) {
      this.selectedNode.push(...this.getTreeKeyFromNode(key));
      this.addParentKey(key);

      const highestKey = this.getHightestKey(key);
      if (highestKey !== key) {
        console.log("highset", highestKey);
        const highestChildKey = this.getTreeKeyFromNode(highestKey);
        console.log("keyNodeTree", highestChildKey);
        this.highestSelectedKey = this.highestSelectedKey.filter(
          item => !highestChildKey.includes(item)
        );
        this.highestSelectedKey.push(highestKey);
      } else this.highestSelectedKey.push(key);
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
      if (highestKey !== key) {
        console.log("highset", highestKey);
        const highestChildKey = this.getTreeKeyFromNode(highestKey);
        console.log("keyNodeTree", highestChildKey);
        this.highestSelectedKey = this.highestSelectedKey.filter(
          item => !highestChildKey.includes(item)
        );
        this.highestSelectedKey.push(highestKey);
      } else this.highestSelectedKey.push(key);
    },

    unChooseNode(key) {
      console.log("key", key);
      // get children key (includes this key) list from node
      const keyNodeList = this.getTreeKeyFromNode(key);
      // remove them in selected node
      this.selectedNode = this.selectedNode.filter(
        item => !keyNodeList.includes(item)
      );

      // find parent key
      let parentKey = this.nodeListObj[key].parent;
      console.log("parent", parentKey);
      // set removeKey
      let removeKey = key;

      // if parent key is null, remove it from highest key list
      if (parentKey === null) {
        this.highestSelectedKey = this.highestSelectedKey.filter(
          item => item === key
        );
      }

      // else, do the next step
      while (parentKey !== null) {
        // get all child of parent key (include parent key)
        const childList = this.nodeListObj[parentKey].children;

        // if a key in child list appear in selected node, check parent key in childrenSelectedNode,
        // if in, do nothing
        // else, push it into list
        if (childList.some(value => this.selectedNode.includes(value))) {
          if (!this.childrenSelectedNode.includes(parentKey)) {
            this.childrenSelectedNode.push(parentKey);
          }
        } else {
          // else remove parent key in childrenSelectedNode
          this.childrenSelectedNode = this.childrenSelectedNode.filter(
            item => item !== parentKey
          );
        }

        // if parent key is in selectedNode
        if (this.selectedNode.includes(parentKey)) {
          // remove it
          this.selectedNode = this.selectedNode.filter(
            item => item !== parentKey
          );

          // and add children in highestSelectedKey, but not remove key
          this.highestSelectedKey.push(...childList);
          this.highestSelectedKey = this.highestSelectedKey.filter(
            item => item !== parentKey && item !== removeKey
          );

          // loop with parent key
          removeKey = parentKey;
          parentKey = this.nodeListObj[parentKey].parent;
        } else {
          this.highestSelectedKey = this.highestSelectedKey.filter(
            item => !item === removeKey
          );

          break;
        }
      }
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
    }
  }
};
</script>