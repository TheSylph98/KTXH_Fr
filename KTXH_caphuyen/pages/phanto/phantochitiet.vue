<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Phân Tổ Chi Tiết</v-toolbar-title>
        <v-divider
          class="mx-3"
          inset
          vertical
        ></v-divider>

         <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details 
          ></v-text-field>

        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Thêm mới</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ma" label="Mã*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ten" label="Nội dung*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
                  </v-col>
                  <v-switch
                    v-model="editedItem.hieuLuc"
                    class="ma-1"
                    label="Hiệu lực"
                  ></v-switch>
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
      icons: {
        mdiPencil,
        mdiDelete
      },
      dialog: false,
       headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'Mã', align: 'left', sorttable: true, value:'ma'},
                { text: 'Nội dung', align: 'left', sorttable: false, value:'ten'},
                { text: 'Ghi chú', align: 'left', sorttable: false, value:'ghiChu'},
                { text: 'Hiệu lực', align: 'left', value:'hieuLuc'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        ma: '',
        ten: '',
        ghiChu:'',
        hieuLuc: 1
      },
      defaultItem: {
        id: 0,
        ma: '',
        ten: '',
        ghiChu:'',
        hieuLuc: 1
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
            ten: 'HCL-2',
            ghiChu: 'halo',
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