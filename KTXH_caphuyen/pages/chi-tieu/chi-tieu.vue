<template>
  <Table 
  :title="title" 
  :headers="headers"
  :items="items_t"
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.id" label="STT*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="editedItem.nhomCT" label="Nhóm CT*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.maCT" label="Mã CT*" ></v-text-field>
            </v-col>
              <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="editedItem.tenCT" label="Tên chỉ tiêu*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.maCTCha" label="Chỉ tiêu cha*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="editedItem.tenCTCha" label="Tên chỉ tiêu*" ></v-text-field>
            </v-col>
              <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.dvt" label="Đơn vị tính*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="editedItem.loai" label="Loại chỉ tiêu*" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.phanTo" label="Có phân tổ" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="editedItem.phanToTheo" label="Phân tổ theo" ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
              :items="caccap"
              v-model="editedItem.soLieuGoc"
              label="Số liệu gốc từ cấp"
              outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
              :items="caccap"
              v-model="editedItem.tonghopSoLieuGoc"
              label="Tổng hợp số liệu đến cấp"
              outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-textarea v-model="editedItem.congThuc" label="Công thức tính" ></v-textarea>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.hieuLuc"
                class="ma-1"
                label="Hiệu lực"
              ></v-switch>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.xoa"
                class="ma-1"
                label="Xóa"
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
      title: 'Chỉ Tiêu KTXH',
      dialog: false,
      operators: operators,
      search: {
      },
      caccap: [
        'cấp tỉnh',
        'cấp huyện',
        'cấp xã'
      ],
      headers: [
          { text: 'STT', align: 'left', sorttable: true, value:'id'},
          { text: 'Nhóm CT', align: 'left', sorttable: false, value:'nhomCT'},
          { text: 'Mã', align: 'left', sorttable: true, value:'maCT'},
          { text: 'Tên chỉ tiêu', align: 'left', sorttable: false, value:'tenCT'},
          { text: 'Đơn vị tính', align: 'left', sorttable: false, value:'dvt'},
          { text: 'Phân tổ', align: 'left', sorttable: false, value:'phanTo'},
          { text: 'Loại', align: 'left', value:'loai'},
          { text: 'Hiệu lực', align: 'left', value:'hieuLuc'},
          { text: 'Thao Tác', align: 'left',  value:'action'},
      ],
      editedIndex: -1
    }
  },
  computed: {
    ...mapState("chiTieu", ["chiTieuList", "pagination"]),
    formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
  },

  asyncData({ store }) {
    store.dispatch("chiTieu/getChiTieuList");
  },

  created() {
    this.getChiTieuList();
  },

  methods: {
    ...mapActions("chiTieu", [
      "getChiTieuList",
      "getChiTieu",
      "addChiTieu",
      "updateChiTieu",
      "deleteChiTieu",
      "restoreChiTieu"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    }
  }
}
</script>