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
        <v-toolbar-title>Khai Báo Người Dùng</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ten" label="Họ Và Tên*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.soDienThoai" label="Số điện thoại"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.donvi" label="Đơn vị"></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.ghiChu" label="Ghi Chú" ></v-text-field>
                  </v-col>
                  <v-switch
                    v-model="hieuLuc"
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
      search:'',
      select: null,
      solo: false,
      hieuLuc: true,
      lazy: true,
      cachieuLuc: [
        1,0
      ],
      dialog: false,
       headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'ID', align: 'left', sorttable: true, value:'id'},
                { text: 'Họ và Tên', align: 'left', sorttable: false, value:'ten'},
                { text: 'Số điện thoại', align: 'left', sorttable: false, value:'soDienThoai'},
                { text: 'Email', align: 'left', sorttable: false, value:'email'},
                { text: 'Đơn Vị', align: 'left', sorttable: false, value:'donvi'},
                { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        ten: '',
        soDienThoai: '',
        email: '',
        donvi: '',
        hieuLuc: 1,
      },
      defaultItem: {
        id: 0,
        ten: '',
        soDienThoai: '',
        email: '',
        donvi: '',
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
            id: 0,
            ten: 'Ha Van Giang',
            soDienThoai: '0123456789',
            email: '1234@gmail.com',
            donvi: '1',
            hieuLuc: 1,
          },
          {
            id: 1,
            ten: 'Ha Van Truong Giang',
            soDienThoai: '01239855',
            email: '123456@gmail.com',
            donvi: '2',
            hieuLuc: 1,
          },
          {
            id: 2,
            ten: 'Nam Van Dinh',
            soDienThoai: '3649184681',
            email: '123wqe4@gmail.com',
            donvi: '3',
            hieuLuc: 1,
          },
          {
            id: 3,
            ten: 'Thai Van Binh',
            soDienThoai: '516556164',
            email: '123ssss434@gmail.com',
            donvi: '1',
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
