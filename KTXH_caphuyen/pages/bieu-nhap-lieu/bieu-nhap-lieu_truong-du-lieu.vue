<template>
    <Table 
    :title="title" 
    :headers="headers"
    :items="items"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)">
  
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ma" label="Kí hiệu*" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tên biểu nhập liệu*" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch
                  v-model="editedItem.hieuLuc"
                  class="ma-1"
                  label="Hiệu lực"
                ></v-switch>
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
import Table from '../../components/table.vue';
import { operators } from "..//..//util//operators";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        Table
    },
    data() {
      return {
        title: 'Biểu Nhập Liệu Trường Dữ Liệu',
        dialog: false,
        operators: operators,
        search: {
        },
        headers: [
            { text: 'STT', align: 'left', sorttable: true, value:'id'},
            { text: 'Kí hiệu', align: 'left', value:'ma'},
            { text: 'Tên biểu', align: 'left', value:'ten'},
            { text: 'Ghi chú', align: 'left', value:'ghiChu'},
            { text: 'Hiệu lực', align: 'left', value:'hieuLuc'},
            { text: 'Thao Tác', align: 'left',  value:'action'},
        ],
        editedIndex: -1
      }
    },
    computed: {
      ...mapState("bieuNhapLieuTruongDuLieu", ["bnlTruongDuLieuList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("bieuNhapLieuTruongDuLieu/getBieuNhapLieuTruongDuLieuList");
    },

    created() {
      this.getBieuNhapLieuTruongDuLieuList();
    },

    methods: {
      ...mapActions("bieuNhapLieuTruongDuLieu", [
        "getBieuNhapLieuTruongDuLieuList",
        "getBieuNhapLieuTruongDuLieu",
        "addBieuNhapLieuTruongDuLieu",
        "updateBieuNhapLieuTruongDuLieu",
        "deleteBieuNhapLieuTruongDuLieu",
        "restoreBieuNhapLieuTruongDuLieu"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      }
    }
};
</script>