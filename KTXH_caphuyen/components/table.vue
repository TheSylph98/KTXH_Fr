<template>
  <div class="custom-table" ::style="{ '--check-box-width': checkBoxWidth}">
    <v-data-table
      v-model="selectItems"
      :headers="headerTables"
      :items="items"
      show-select
      hide-default-footer
      dense
      :items-per-page="200"
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
          <td>
            <span class="empty-content"></span>
          </td>
          <td v-for="(item, index) in headerTables" :key="index" :class="getClass(index)">
            <span v-if="item.value === 'index'" class="empty-content"></span>
            <span v-else-if="item.value === 'action'">
              <v-btn color="warning" dark rounded small @click="$emit('filter', search)">Lọc</v-btn>
            </span>
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
            <span v-else></span>
          </td>
        </tr>
      </template>

      <template v-slot:item.id="column">
        <span>{{ indexObject[column.item.id] }}</span>
      </template>

      <template v-for="el in dateColumn" :slot="`item.${el}`" slot-scope="column">
        <span>{{column.item[el] | formatDate }}</span>
      </template>

      <template v-slot:item.hieuLuc="column">
        <span v-if="column.item.hieuLuc">Có</span>
        <span v-else>Không</span>
      </template>

      <template v-slot:item.action="row">
        <span>
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
      </template>

      <template v-slot:no-data>
        <p>Chưa cập nhập dữ liệu</p>
      </template>

      <template v-slot:footer>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="2">
            <v-form>
              <v-autocomplete
                outlined
                label="Số hàng trên trang"
                :items="pageSizeList"
                v-model="paginationValue.pageSize"
                @change="$emit('changePageSize', $event)"
              ></v-autocomplete>
            </v-form>
          </v-col>
          <v-col cols="8">
            <v-pagination
              v-model="paginationValue.page"
              :total-visible="paginationValue.visiblePage"
              :length="paginationValue.numberOfPage.valueOf()"
              circle
              @input="$emit('changePage', $event - 1)"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="500" @click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{ dialogTitle }}</v-card-title>

        <v-card-text>{{ dialogContent }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">Huỷ</v-btn>
          <v-btn color="primary" text @click="handleDelete">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" top color="#fff" :timeout="timeout">
      <v-alert text :type="notifiedType">{{ notification }}</v-alert>
    </v-snackbar>
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
    },

    pagination: {
      type: Object,
      default() {
        return {
          page: 0,
          pageSize: 20
        };
      }
    },

    pageSizeList: {
      type: Array,
      default() {
        return [20, 50, 100, 200];
      }
    },

    timeout: {
      type: Number,
      default: 1000
    },

    notification: {
      type: String,
      default: "Cập nhật dữ liệu thành công"
    },

    snackbar: {
      type: Boolean,
      default: false
    },

    notifiedType: {
      type: String,
      default: "success"
    },

    tableWidth: {
      type: Object,
      default() {
        return {
          index: null,
          checkbox: null,
          action: null
        };
      }
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
    dateColumn() {
      return this.headers
        .filter(item => item.type === "date")
        .map(item => item.value);
    },

    checkBoxWidth() {
      return this.tableWidth.checkbox;
    },

    headerTables() {
      if (this.showIndex) {
        return [
          {
            text: "STT",
            align: "center",
            width: this.tableWidth.index,
            value: "id"
          }
        ].concat(this.headers, [
          {
            text: "Thao tác",
            width: this.tableWidth.action,
            align: "center",
            value: "action"
          }
        ]);
      } else
        return this.headers.concat([
          {
            text: "Thao tác",
            width: this.tableWidth.action,
            align: "center",
            value: "action"
          }
        ]);
    },

    paginationValue() {
      const total = this.pagination.total ? Number(this.pagination.total) : 0;
      const pageSize = Number(this.pagination.pageSize);

      const numberOfPage = Math.ceil(total / pageSize);
      const visiblePage = numberOfPage < 6 ? numberOfPage : 6;

      return {
        total: Number(total),
        numberOfPage: Number(numberOfPage),
        visiblePage: visiblePage,
        pageSize: pageSize,
        page: Number(this.pagination.page) + 1
      };
    },

    indexObject() {
      const indexObject = {};
      Object.keys(this.items).forEach(el => {
        const key = this.items[el].id;
        if (key) {
          indexObject[key] =
            Number(el) + this.pagination.page * this.pagination.pageSize + 1;
        }
      });
      return indexObject;
    }
  },

  methods: {
    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },

    getTableValue(obj, attibuteText) {
      let result = obj;
      const attibuteArr = attibuteText.split(".");
      attibuteArr.forEach(e => {
        if (result) {
          result = result[e];
        }
      });
      return result;
    },

    changeSelectItem(value, element) {
      if (value) {
        this.selectItems.push(element);
      } else {
        const index = this.selectItems.findIndex(
          item => item.id === element.id
        );
        this.selectItems.splice(index, 1);
      }
    },

    filterChange(eValue, el) {
      this.search[el] = eValue;
    },

    closeDialog() {
      this.selectItems = [];
      this.dialog = false;
    },

    clickeDeleteItem(item) {
      this.selectItems = [item];
      this.dialog = true;
    },

    handleDelete() {
      this.$emit("delete", this.selectItems);
      this.selectedItems = [];
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss">
.custom-table {
  .v-snack__content {
    margin: 0;
    padding: 0;

    .v-alert {
      margin: 0;
      width: inherit;
    }
  }

  td {
    padding: 0;
    .empty-content {
      background-color: rgba(0, 0, 0, 0.05);
      height: 100%;
    }
  }

  .v-data-table {
    td.text-start {
      text-align: center;
    }

    .v-data-table-header {
      th {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        background-color: rgba(0, 0, 0, 0.12);
      }

      th:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.12);
      }

      th.text-start {
        width: var(--check-box-width);
      }
    }
    tbody {
      td:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>