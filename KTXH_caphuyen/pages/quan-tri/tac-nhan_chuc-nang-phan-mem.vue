<template>
  <Table
    :title="title"
    :headers="headers"
    :items="items"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-btn color="primary" dark class="mb-2" @click="addNew()">Lưu</v-btn>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
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

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "@/components/table.vue";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        Table
    },
    data() {
      return {
        title: 'Khai Báo Tác Nhân Chức Năng Phần Mềm',
        operators: operators,
        search: {
        },
        headers: [
          { text: 'STT', align: 'left', sorttable: true, value:'id'}, 
          { text: 'Chức năng phần mềm', align: 'left', value:'ten'},
          { text: 'Thao Tác', align: 'left',  value:'action'},
        ],
        editedIndex: -1,
        editedItem: {
          ten: ''
        }
      }
    };
  },
  created() {
    this.items = [
      {
        id: 1,
        ten: "tac nhan 1",
        hieuLuc: 1
      },
      {
        id: 2,
        ten: "tac nhan 2",
        hieuLuc: 1
      }
    ];
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    add() {
      this.dialog = true;
    },
    computed: {
      ...mapState("qtTacNhanChucNangPhanMem", ["tacNhanChucNangPhanMemList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("qtTacNhanChucNangPhanMem/getQTTacNhanChucNangPhanMemList");
    },

    created() {
      this.getQTTacNhanChucNangPhanMemList();
    },

    methods: {
      ...mapActions("qtTacNhanChucNangPhanMem", [
        "getQTTacNhanChucNangPhanMemList",
        "getQTTacNhanChucNangPhanMem",
        "addQTTacNhanChucNangPhanMem",
        "updateQTTacNhanChucNangPhanMem",
        "deleteQTTacNhanChucNangPhanMem",
        "restoreQTTacNhanChucNangPhanMem"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      },
      add() {
        this.dialog = true
      },
      edit(item) {
        this.addQTTacNhanChucNangPhanMem(this.editedIndex)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      delete(tiem) {
        const index = this.items.indexOf(item)
        confirm('Xác nhận xóa?') && this.items.splice(index, 1)
        this.deleteQTTacNhanChucNangPhanMem(this.editedItem)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
      this.close();
    }
  }
};
</script>