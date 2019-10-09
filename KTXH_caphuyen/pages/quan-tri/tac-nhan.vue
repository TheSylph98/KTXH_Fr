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
                <v-text-field v-model="editedItem.ten" label="Tên tác nhân"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.sysCapHanhChinhId" label="Cấp hành chính"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Chức năng, Nhiệm vụ"></v-textarea>
              </v-col>
              <v-switch
                v-model="editedItem.hieuLuc"
                class="ma-1"
                label="Hiệu lực"
              ></v-switch>
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
        title: 'Biểu Nhập Liệu Chỉ Tiêu',
        dialog: false,
        operators: operators,
        search: {
        },
        headers: [
          { text: 'STT', align: 'left', sorttable: true, value:'id'},
          { text: 'Tên tác nhân', align: 'left', sorttable: false, value:'ten'},
          { text: 'Cấp hành chính', align: 'left', sorttable: false, value:'sysCapHanhChinhId'},
          { text: 'Chức năng, nhiệm vụ', align: 'left', sorttable: false, value:'ghiChu'},
          { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
          { text: 'Thao Tác', align: 'left',  value:'action'},
        ],
        editedIndex: -1
      }
    },
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
      }
    }
}
</script>