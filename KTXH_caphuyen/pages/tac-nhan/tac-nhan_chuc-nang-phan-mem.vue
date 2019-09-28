<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
    :single-select="singleSelect"
    show-select
  >
    <template v-slot:top>   
      <v-toolbar flat color="white">
        <v-toolbar-title>Chọn chức năng phần mềm cho tác nhân: {{ title }}</v-toolbar-title>
       
        <div class="flex-grow-1"></div>
        <v-btn color="primary" class="mb-2 save">Lưu</v-btn>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Thêm mới</v-btn> -->
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ten" label="Chức năng phần mềm"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Đóng</v-btn>
              <v-btn color="blue darken-1" text @click="save">Lưu</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-switch v-model="singleSelect" label="Đơn chọn" class="pa-2"></v-switch>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >{{ icons.mdiPencil }}</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >{{ icons.mdiDelete }}</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import {
    mdiAccount,
    mdiPencil,
    mdiDelete,
  } from '@mdi/js'

  export default {
    data: () => ({
      search:'',
      singleSelect: false,
      selected: [],
      solo: false,
      icons: {
        mdiPencil,
        mdiDelete
      },
      title: 'Cán bộ văn phòng - Thống kê xã',
      dialog: false,
      headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'}, 
                { text: 'Chức năng phần mềm', align: 'left', value:'ten'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        ten: '',
        hieuLuc: 1,
      },
      defaultItem: {
        id: 0,
        ten: '',
        hieuLuc: 1,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật thông tin chi tiết'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.items = [
          {
            id: 1,
            ma: '01',
            ten: 'chỉ tiêu tổng quát 1',
            hieuLuc: 1
          },
          {
            id: 2,
            ma: 'fff',
            ten: 'chỉ tiêu tổng quát 2',
            hieuLuc: 1
          },
          {
            id: 3,
            ma: '0dd1',
            ten: 'chỉ tiêu tổng quát 3',
            hieuLuc: 1
          },
          {
            id: 4,
            ma: '0fa1',
            ten: 'chỉ tiêu tổng quát 4',
            hieuLuc: 1
          }
        ]
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Xác nhận xóa?') && this.items.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
