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
        <v-toolbar-title>Khai Báo Từ Điển: Địa Bàn-huyện</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.matinh" label="Mã tỉnh"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.tinh" label="Tỉnh"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ma" label="Mã huyện"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ten" label="Huyện"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.maxa" label="Mã xã"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.xa" label="Xã"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-select
                    :items="donViHanhChinh"
                    v-model="editItem.dvhch"
                    label="Cấp đơn vị hành chính"
                    outlined
                    ></v-select>
                    </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-select
                    :items="loaidonViHanhChinh"
                    v-model="editItem.loaidvhch"
                    label="Loại đơn vị hành chính"
                    outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                  <v-radio-group v-model="editItem.vung" :mandatory="false">
                    <v-radio label="Thành Thị" value="thanhthi"></v-radio>
                    <v-radio label="Nông thôn" value="nongthon"></v-radio>
                    <v-radio label="Biên giới" value="biengioi"></v-radio>
                    <v-radio label="Hải Đảo" value="haidao"></v-radio>
                    <v-radio label="Vùng đặc biệt khó khăn" value="dbkk"></v-radio>
                  </v-radio-group>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ghiChu" label="Ghi Chú"></v-text-field>
                  </v-col>
                  <v-switch
                    v-model="hieuLuc"
                    class="ma-1"
                    label="Hieu luc"
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
      >edit</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  
</template>

<script>
  export default {
    data: () => ({
      donViHanhChinh: [
          'Cấp tỉnh',
          'Cấp huyện',
          'Cấp Xã',
          'Đặc khu kinh tế'
      ],
      loaidonViHanhChinh: [
          'Loại I',
          'Loại II',
          'Loại III'
      ],
      search:'',
      vung:'',
      select: null,
      solo: false,
      hieuLuc: true,
      cachieuLuc: [
        1,0
      ],
      dialog: false,
       headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'Mã định danh', align: 'left', sorttable: true, value:'ma'},
                { text: 'Nội dung', align: 'left', sorttable: false, value:'ten'},
                { text: 'Ghi Chú', align: 'left', sorttable: false, value:'ghiChu'},
                { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        ma: '',
        matinh:'',
        maxa:'',
        tinh: '',
        ten: '',
        xa: '',
        dvhc: '',
        loaidvhc: '',
        vung:'',
        ghiChu: '',
        hieuLuc: 1,
      },
      defaultItem: {
        id: 0,
        ma: '',
        tinh: '',
        ten: '',
        xa: '',
        dvhc: '',
        loaidvhc: '',
        vung:'',
        ghiChu: '',
        hieuLuc: 1,
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
            ma: '01',
            ten: 'Cam Lộ',
            dhvc: 'Cấp Huyện',
            loaidvhc:'Loại I',
            vung: 'nongthon',
            ghiChu: 'no',
            hieuLuc: false
          },
          {
            id: 2,
            ma: 'fff',
            ten: 'Đống Đa',
            dhvc: 'Cấp Huyện',
            loaidvhc:'Loại I',
            vung: 'nongthon',
            ghiChu: '123',
            hieuLuc: 1
          },
          {
            id: 3,
            ma: '0dd1',
            ten: 'Hai Bà Trưng',
            dhvc: 'Cấp Huyện',
            loaidvhc:'Loại I',
            vung: 'nongthon',
            ghiChu: 'ooooooo',
            hieuLuc: 1
          },
          {
            id: 4,
            ma: '0fa1',
            ten: 'Hoàng Mai',
            dhvc: 'Cấp Huyện',
            loaidvhc:'Loại I',
            vung: 'nongthon',
            ghiChu: 'ha lo ba by',
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
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
