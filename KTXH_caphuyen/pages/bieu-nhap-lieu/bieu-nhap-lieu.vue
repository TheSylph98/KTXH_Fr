<template>
    <app-table 
    v-bind:title="title" 
    v-bind:headers="headers"
    v-bind:dialog="dialog"
    v-bind:items="items"
    v-bind:editedIndex="editedIndex"
    v-bind:editedItem="editedItem"
    v-bind:defaultItem="defaultItem"
    v-bind:formTitle="formTitle"
    v-on:edit="editItem($event)">
        <v-col cols="12" sm="6" md="8">
        <v-text-field v-model="editedItem.ma" label="Kí hiệu*" ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="8">
        <v-text-field v-model="editedItem.ten" label="Tên biểu nhập liệu*" ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="8">
        <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
        </v-col>
    </app-table>
</template>

<script>
import Table from '../../components/table.vue'

export default {
    components: {
        appTable: Table
    },
    data() {
        return {
            title: 'AAAA',
            headers: [
                { text: 'STT', align: 'left', sorttable: true, value:'id'},
                { text: 'Kí hiệu', align: 'left', sorttable: true, value:'ma'},
                { text: 'Tên biểu', align: 'left', sorttable: false, value:'ten'},
                { text: 'Ghi chú', align: 'left', sorttable: false, value:'ghiChu'},
                { text: 'Hiệu lực', align: 'left', value:'hieuLuc'},
                { text: 'Thao Tác', align: 'left',  value:'action'},
            ],
            dialog: false,
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
                }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật thông tin'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created() {
        this.initialize()
    },
      methods: {
      initialize () {
        this.items = [
          {
            id: 1,
            ma: '01',
            ten: 'HCL-báo cáo tổng quát',
            ghiChu: 'halo',
            hieuLuc: 1
          }
        ]
      },
      editItem: function(edit, item) {
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