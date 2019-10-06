<template>
<div>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
    show-select
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider
          class="mx-3"
          inset
          vertical
        ></v-divider>

        <div class="flex-grow-1"></div>
          <v-btn color="primary" dark class="mb-2" @click="addNew()">Thêm mới</v-btn>
          <slot></slot>
      </v-toolbar>
    </template>
    
    <template v-slot:item.action="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon
            small
            v-on="on"
            class="mr-2"
            @click="editItem(item)"
          >mdi-pencil</v-icon>
        </template>
        <span>Chỉnh sửa</span>
      </v-tooltip> 

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon
            small
            v-on="on"
            @click="deleteItem(item)"
          >mdi-delete</v-icon>
        </template>
        <span>Xóa</span>
      </v-tooltip>
    </template>

      <!-- <template v-slot:item.no="item">
      {{ index }}  
      </template> -->

    <template v-slot:no-data>
     <p>Chưa cập nhập dữ liệu</p>
    </template>
  </v-data-table>

</div>
</template>

<script>
  export default {
    props: {
      headers: {
          type: Array,
      },
      items: {
          type: Array
      },
      title: {
          type: String
      }
    },
    data() {
      return {
        index: 1
      }
    },
    methods: {
      addNew() {
        this.$emit("add")
      },
      editItem (item) {
        this.$emit("edit", item)
      },
      deleteItem (item) {
        this.$emit("delete", item)
      },
    }
    
  }
</script>