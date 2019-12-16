<template>
  <Table
    :title="title"
    :headers="headers"
    :items="tacNhanChucNangPhanMemList"
    :pagination="pagination"
    @edit="edit($event)"
    @delete="deleted($event)"
    @clickAdd="clickAddNew"
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
                <v-text-field v-model="chucNang.ten" label="Chức năng phần mềm"></v-text-field>
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
      title: "Khai báo tác nhân chức năng phần mềm",
      headers: [
        {
          text: "Chức năng phần mềm",
          align: "center",
          value: "ten",
          type: "string"
        }
      ],
      formTitle: "",
      chucNang: {
        ten: ""
      }
    };
  },
  computed: {
    ...mapState("quantri/qtTacNhan-ChucNangPhanMem", [
      "tacNhanChucNangPhanMemList",
      "pagination"
    ])
  },

  asyncData({ store }) {
    store.dispatch(
      "quantri/qtTacNhan-ChucNangPhanMem/getQTTacNhanChucNangPhanMemList"
    );
  },

  created() {
    this.getQTTacNhanChucNangPhanMemList();
  },

  methods: {
    ...mapActions("quantri/qtTacNhan-ChucNangPhanMem", [
      "getQTTacNhanChucNangPhanMemList",
      "getQTTacNhanChucNangPhanMem",
      "addQTTacNhanChucNangPhanMem",
      "updateQTTacNhanChucNangPhanMem",
      "deleteQTTacNhanChucNangPhanMem",
      "restoreQTTacNhanChucNangPhanMem"
    ]),

    clickAddNew() {
      this.dialog = true;
      this.isUpdate = false;
      this.formTitle = "Thêm chức năng phần mềm mới";
      this.chucNang = {
        ten: ""
      };
    },

    edit(item) {
      this.addQTTacNhanChucNangPhanMem(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.chucNang = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteQTTacNhanChucNangPhanMem(this.chucNang);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.chucNang);
      } else {
        this.items.push(this.chucNang);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.chucNang = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>