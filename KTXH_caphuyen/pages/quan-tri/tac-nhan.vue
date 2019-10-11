<template>
  <Table
    :title="title"
    :headers="headers"
    :items="items"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
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
                <v-text-field v-model="editedItem.ma" label="Mã"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tên tác nhân"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.sysCapHanhChinhId" label="Cấp hành chính"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Chức năng, Nhiệm vụ"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.xoa" class="ma-1" label="Xóa"></v-switch>
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
      title: "Biểu Nhập Liệu Chỉ Tiêu",
      dialog: false,
      headers: [
        {
          text: "Tên tác nhân",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        headers: [
          { text: 'Tên tác nhân', align: 'left', sorttable: false, value:'ten'},
          { text: 'Cấp hành chính', align: 'left', sorttable: false, value:'sysCapHanhChinhId'},
          { text: 'Chức năng, nhiệm vụ', align: 'left', sorttable: false, value:'ghiChu'},
          { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
          { text: 'Thao Tác', align: 'left',  value:'action'},
        ],
        editedIndex: -1,
        editedItem: {
          ma: '',
          ten: '',
          sysCapHanhChinhId: 0,
          ghiChu: '',
          hieuLuc: 1,
          xoa: 0
        },
        defaultItem: {
          ma: '',
          ten: '',
          sysCapHanhChinhId: 0,
          ghiChu: '',
          hieuLuc: 1,
          xoa: 0
        }
      }
    };
  },
  created() {
    this.items = [
      {
        id: 0,
        ten: "",
        sysCapHanhChinhId: 1,
        ghiChu: "",
        hieuLuc: 0
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
<<<<<<< HEAD:KTXH_caphuyen/pages/tac-nhan/tac-nhan.vue
    edit(item) {
      console.log(item);
      this.dialog = true;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleted(item) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
=======
    computed: {
      ...mapState("qtTacNhan", ["tacNhanList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("qtTacNhan/getQTTacNhanList");
    },

    created() {
      this.getQTTacNhanList();
    },

    methods: {
      ...mapActions("qtTacNhan", [
        "getQTTacNhanList",
        "getQTTacNhan",
        "addQTTacNhan",
        "updateQTTacNhan",
        "deleteQTTacNhan",
        "restoreQTTacNhan"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      },
      add() {
        this.dialog = true
      },
      edit(item) {
        this.addQTTacNhan(this.editedIndex)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      delete(tiem) {
        const index = this.items.indexOf(item)
        confirm('Xác nhận xóa?') && this.items.splice(index, 1)
        this.deleteQTTacNhan(this.editedItem)
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
>>>>>>> 4bed7dfada7c1e7748c80bcb5ee43bc38b538452:KTXH_caphuyen/pages/quan-tri/tac-nhan.vue
      }
      this.close();
    }
  }
};
</script>