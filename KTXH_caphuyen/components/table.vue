<template>
  <div>
    <v-data-table
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
                  <v-icon small v-on="on" class="mr-2" @click="$emit('edit', item)">mdi-pencil</v-icon>
                </template>
                <span>Chỉnh sửa</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on" @click="$emit('delete', item)">mdi-delete</v-icon>
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
    }
  },
  data() {
    return {
      index: 1,
      search: {}
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

    clickFilter() {}
  }
};
</script>