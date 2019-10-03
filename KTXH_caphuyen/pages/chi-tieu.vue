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
                <v-text-field v-model="editedItem.ten" label="Tên"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-switch v-model="editedItem.hieuLuc" class="ma-1" label="Hieu luc"></v-switch>
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
      search: {},
      headers: [
        { text: "STT", align: "left", sorttable: true, value: "index" },
        { text: "Mã", align: "left", sorttable: true, value: "ma" },
        {
          text: "Tên nhóm chỉ tiêu KTXH",
          align: "left",
          sorttable: false,
          value: "ten"
        },
        { text: "Ghi Chú", align: "left", sorttable: false, value: "ghiChu" },
        { text: "Hiệu lực", align: "left", sorttable: true, value: "hieuLuc" },
        { text: "Thao Tác", align: "left", value: "action" }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        ma: "",
        ten: "",
        ghiChu: "",
        hieuLuc: 1
      }
    };
  },
  created() {
    this.items = [
      {
        id: 0,
        ma: "012",
        ten: "nhom tieu chi 01",
        ghiChu: "ko",
        hieuLuc: 1
      },
      {
        id: 0,
        ma: "012",
        ten: "nhom tieu chi 01",
        ghiChu: "ko",
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
      }
      this.close();
    }
  }
};
</script>