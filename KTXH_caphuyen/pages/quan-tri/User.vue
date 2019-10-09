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
                <v-text-field v-model="editedItem.ten" label="Họ Và Tên*"></v-text-field>
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
        title: 'Khai Báo Người Dùng',
        dialog: false,
        operators: operators,
        search: {
        },
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
        editedIndex: -1,
      }
    },
    computed: {
      ...mapState("qtUser", ["userList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("qtUser/getQTUserList");
    },

    created() {
      this.getQTUserList();
    },

    methods: {
      ...mapActions("qtUser", [
        "getQTUserList",
        "getQTUser",
        "addQTUser",
        "updateQTUser",
        "deleteQTUser",
        "restoreQTUser"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      }
    }
}
</script>