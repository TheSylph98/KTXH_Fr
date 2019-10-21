<template>
  <div>
    <v-data-table
      v-model="selectItems"
      :headers="headerTables"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      show-select
      dense
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-3" inset vertical></v-divider>

          <div class="flex-grow-1"></div>
          <v-btn color="primary" dark class="mb-2" @click="$emit('clickAdd')">Thêm mới</v-btn>
          <v-btn v-if="selectItems.length" class="mb-2" @click="dialog = true">Xóa</v-btn>
          <slot></slot>
        </v-toolbar>
      </template>

      <template slot="body.prepend" class="search">
        <tr>
          <td></td>
          <td v-for="(item, index) in headerTables" :key="index" :class="getClass(index)">
            <div v-if="item.value === 'index'"></div>
            <div v-else-if="item.value === 'action'">
              <v-btn color="warning" dark rounded small @click="$emit('filter', search)">Lọc</v-btn>
            </div>
            <StringFilter
              v-if="item.type === 'string'"
              @change="filterChange($event, item.value)"
              @enter="$emit('filter', search)"
            />
            <NumberFilter
              v-else-if="item.type === 'number'"
              @change="filterChange($event, item.value)"
              @enter="$emit('filter', search)"
            />
            <DateFilter
              v-else-if="item.type === 'date'"
              @change="filterChange($event, item.value)"
              @enter="$emit('filter', search)"
            />
            <div v-else></div>
          </td>
        </tr>
      </template>

      <template slot="item" slot-scope="row">
        <tr>
          <td v-for="(el, inx) in row.headers" :key="inx">
            <span v-if="el.value === 'data-table-select'">
              <v-checkbox v-model="row.isSelected"></v-checkbox>
            </span>

            <span v-else-if="el.value === 'index'">{{row.index + 1}}</span>
            <span v-else-if="el.value === 'action'">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" class="mr-2" @click="$emit('edit', row.item)">mdi-pencil</v-icon>
                </template>
                <span>Chỉnh sửa</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" @click="clickeDeleteItem(row.item)">mdi-delete</v-icon>
                </template>
                <span>Xóa</span>
              </v-tooltip>
            </span>
            <span v-else>{{row.item[el.value]}}</span>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <p>Chưa cập nhập dữ liệu</p>
      </template>
    </v-data-table>

     <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ dialogTitle }}
        </v-card-title>

        <v-card-text>
          {{ dialogContent }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            Huỷ
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="handleDelete"
          >
            Xóa
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StringFilter from "./Filter/StringFilter";
import NumberFilter from "./Filter/NumberFilter";
import DateFilter from "./Filter/DateFilter";

export default {
  components: {
    StringFilter: StringFilter,
    NumberFilter: NumberFilter,
    DateFilter: DateFilter
  },

  props: {
    headers: {
      type: Array,
      require: true
    },

    items: {
      type: Array,
      require: true
    },

    title: {
      type: String,
      require: true
    },

    showIndex: {
      type: Boolean,
      default: true
    },

    dialogTitle: {
      type: String,
      default: "Xác nhận xóa"
    },

    dialogContent: {
      type: String,
      default: "Bạn có chắc chắn muốn xóa không?"
    }
  },
  data() {
    return {
      index: 1,
      search: {},
      selectItems: [],
      dialog: false
    };
  },

  computed: {
    headerTables() {
      if (this.showIndex) {
        return [{ text: "STT", align: "center", value: "index" }].concat(
          this.headers,
          [{ text: "Thao tác", align: "center", value: "action" }]
        );
      } else
        return this.headers.concat([
          { text: "Thao tác", align: "center", value: "action" }
        ]);
    }
  },

  methods: {
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },

    filterChange(eValue, el) {
      this.search[el] = eValue;
    },

    closeDialog() {
      this.selectItems = []
      this.dialog = false
    },

    clickeDeleteItem(item) {
      this.selectItems = [item]
      this.dialog = true
    },

    handleDelete() {
      this.$emit("delete", this.selectItems)
      this.selectedItems = []
      this.dialog = false
    }
  }
};
</script>