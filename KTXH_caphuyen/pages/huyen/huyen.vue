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
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                  :items="donViHanhChinh"
                  v-model="editedItem.dvhch"
                  label="Cấp đơn vị hành chính"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                  :items="loaidonViHanhChinh"
                  v-model="editedItem.loaidvhch"
                  label="Loại đơn vị hành chính"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.nongthon" class="ma-1" label="Thành Thị - Nông thôn"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.biengioi" class="ma-1" label="Biên giới"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.haidao" class="ma-1" label="Hải đảo"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.dbkk" class="ma-1" label="Vùng đặc biệt khó khăn"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="12">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
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
      title: "Khai Báo Từ Điển: Huyện",
      dialog: false,
      search: {},
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
      headers: [
        {
          text: "Mã định danh",
          align: "center",
          sorttleftable: true,
          value: "ma"
        },
        { text: "Tên", align: "center", sorttable: false, value: "ten" },
        { text: "Ghi Chú", align: "center", sorttable: false, value: "ghiChu" },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc"
        }
      ],
      editedIndex: -1,
      items: [],
      editedItem: {
        id: 0,
        matinh: "",
        tinh: "",
        ma: "",
        ten: "",
        dvhch: "",
        nongthon: 0,
        biengioi: 0,
        haidao: 0,
        dbkk: 0,
        ghiChu: "",
        hieuLuc: 1
      },
      defaultItem: {
        id: 0,
        matinh: "",
        tinh: "",
        ma: "",
        ten: "",
        dvhch: "",
        nongthon: 0,
        biengioi: 0,
        haidao: 0,
        dbkk: 0,
        ghiChu: "",
        hieuLuc: 1
      }
    };
  },
  created() {
    this.items = [
      {
        id: 1,
        matinh: "01",
        tinh: "Thai Beo",
        ma: "01",
        ten: "Dong Hung",
        dvhch: "",
        nongthon: 0,
        biengioi: 0,
        haidao: 0,
        dbkk: 0,
        ghiChu: "",
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