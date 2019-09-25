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
        <v-toolbar-title>Khai Báo chỉ tiêu KTXH</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="800px">
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="STT*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.nhomCT" label="Nhóm CT*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.maCT" label="Mã CT*" required></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.tenCT" label="Tên chỉ tiêu*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.chiTieuCha" label="Chỉ tiêu cha*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.tenCT" label="Tên chỉ tiêu*" required></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tenCTCha" label="Đơn vị tính*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.loai" label="Loại chỉ tieu*" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dvt" label="Có phân tổ" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.phanTo" label="Phân tổ theo" ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-select
                    :items="caccap"
                    v-model="editItem.soLieuGoc"
                    label="Số liệu gốc từ cấp"
                    outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-select
                    :items="caccap"
                    v-model="editItem.tonghopSoLieuGoc"
                    label="Tổng hợp số liệu đến cấp"
                    outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.congThuc" label="Công thức tính" ></v-text-field>
                  </v-col>
                  <v-switch
                    v-model="editedItem.hieuLuc"
                    class="ma-1"
                    label="Hiệu lực"
                  ></v-switch>
                  <v-switch
                    v-model="editedItem.xoa"
                    class="ma-1"
                    label="Xóa"
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
      <v-btn color="primary" @click="initialize">Cập nhật lại</v-btn>
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
      caccap: [
          'cấp tỉnh',
          'cấp huyện',
          'cấp xã'
      ],
      dialog: false,
       headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'Nhóm CT', align: 'left', sorttable: false, value:'nhomCT'},
                { text: 'Mã', align: 'left', sorttable: true, value:'ma'},
                { text: 'Tên chỉ tiêu', align: 'left', sorttable: false, value:'ten'},
                { text: 'DVT', align: 'left', sorttable: false, value:'dvt'},
                { text: 'Phân tổ', align: 'left', sorttable: false, value:'phanTo'},
                { text: 'Loại', align: 'left', sorttable: false, value:'loai'},
                { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        nhomCT:'',
        ma: '',
        ten: '',
        dvt:'',
        phanTo: '',
        loai:'',
        hieuLuc: 1,
        xoa:false
      },
      defaultItem: {
        id: 0,
        nhomCT:'',
        ma: '',
        ten: '',
        dvt:'',
        phanTo: '',
        loai:'',
        hieuLuc: 1,
        xoa:false
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật thông tin chi tiết đơn vị'
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
            nhomCT:'1',
            ma: 'xzt',
            ten: ' Can Bo XTY',
            dvt:'1',
            phanTo: '2',
            loai:'2',
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