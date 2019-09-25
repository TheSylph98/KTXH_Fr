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
        <v-toolbar-title>Năm Báo Cáo</v-toolbar-title>
        <v-divider
          class="mx-4"
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
        <v-dialog v-model="dialog" max-width="600px">
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
                    <v-text-field v-model="editedItem.nam" label="Năm"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.sysCapHanhChinhId" label="Kỳ báo cáo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.noiDung" label="Nội dung"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ngayMo" label="Ngày mở"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ngayDong" label="Ngày đóng"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.trangThai" label="Trạng thái"></v-text-field>
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      select: null,
      solo: false,
      icons: {
        mdiPencil,
        mdiDelete
      },
      dialog: false,
       headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'Năm', align: 'left', sorttable: true, value:'nam'},
                { text: 'Kỳ báo cáo', align: 'left', value:'kyBaoCao'},
                { text: 'Nội dung', align: 'left', sorttable: false, value:'noiDung'},
                { text: 'Ngày mở', align: 'left', sorttable: false, value:'ngayMo'},
                { text: 'Ngày đóng', align: 'left', sorttable: false, value:'ngayDong'},
                { text: 'Trạng Thái', align: 'left', value:'trangThai'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        nam: 2019,
        kyBaoCao: '',
        noiDung: '',
        ngayMo: '',
        ngayDong: '',
        trangThai: '',
        hieuLuc: 0,
      },
      defaultItem: {
        id: 0,
        nam: 2019,
        kyBaoCao: '',
        noiDung: '',
        ngayMo: '',
        ngayDong: '',
        trangThai: '',
        hieuLuc: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Sửa'
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
            nam: 2019,
            kyBaoCao: 'Thang',
            noiDung: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'kk',
            hieuLuc: 1,
          },
          {
            id: 2,
            nam: 2019,
            kyBaoCao: 'Thang',
            loaiBaoCao: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'gd',
            hieuLuc: 1,
          },
          {
            id: 3,
            nam: 2019,
            kyBaoCao: 'Quy',
            noiDung: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'ff',
            hieuLuc: 1,
          },
          {
            id: 4,
            nam: 2019,
            kyBaoCao: 'Quy',
            noiDung: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'gfd',
            hieuLuc: 1,
          },
          {
            id: 5,
            nam: 2019,
            kyBaoCao: 'Thang',
            noiDung: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'kk',
            hieuLuc: 1,
          },
          {
            id: 6,
            nam: 2018,
            kyBaoCao: 'Thang',
            noiDung: '',
            ngayMo: '',
            ngayDong: '',
            trangThai: 'kk',
            hieuLuc: 1,
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
        confirm('Xác nhận xóa báo cáo?') && this.items.splice(index, 1)
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
