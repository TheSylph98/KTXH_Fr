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
                <v-text-field v-model="editedItem.nam" label="Năm"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.sysCapHanhChinhId" label="Kỳ báo cáo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ngayMo" label="Ngày mở"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ngayDong" label="Ngày đóng"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ngayBatDau" label="Ngày bắt đàu cập nhật"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ngayKetThuc" label="Ngày kết thúc tổng hợp"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="editedItem.ngayBaoCaoHuyen"
                  label="Ngày hoàn thành báo cáo cấp Huyện"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="editedItem.ngayBaoCaoTinh"
                  label="Ngày hoàn thành báo cáo cấp Tỉnh"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.trangThai" label="Trạng thái"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
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
      title: "Khai Báo Kỳ Báo Cáo",
      dialog: false,
      search: {},
      headers: [
        { text: "Năm", align: "center", sorttable: true, value: "nam" },
        {
          text: "Kỳ báo cáo",
          align: "center",
          sorttable: false,
          value: "kyBaoCao"
        },
        {
          text: "Nội Dung",
          align: "center",
          sorttable: false,
          value: "noiDung"
        },
        {
          text: "Ngày mở báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayMo"
        },
        {
          text: "Ngày đóng báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayDong"
        },
        {
          text: "Ngày bắt đầu cập nhập",
          align: "center",
          sorttable: true,
          value: "ngayBatDau"
        },
        {
          text: "Ngày kết thúc tổng hợp báo cáo",
          align: "center",
          sorttable: true,
          value: "ngayKetThuc"
        },
        {
          text: "Ngày hoàn thành báo cáo cấp huyện",
          align: "center",
          sorttable: true,
          value: "ngayBaoCaoHuyen"
        },
        {
          text: "Ngày hoàn thành báo cáo cấp tỉnh",
          align: "center",
          sorttable: true,
          value: "ngayBaoCaoTinh"
        },
        { text: "Trạng Thái", align: "center", value: "trangThai" }
      ],
      editedIndex: -1,
      items: [],
      editedItem: {
        id: 0,
        nam: 2019,
        kyBaoCao: "",
        noiDung: "",
        ngayMo: "",
        ngayDong: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        trangThai: "",
        hieuLuc: 1
      }
    };
  },
  created() {
    this.items = [
      {
        id: 1,
        nam: 2019,
        kyBaoCao: "thang",
        noiDung: "ko co gi",
        ngayMo: "19-9-2019",
        ngayDong: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        trangThai: "da hoan thanh",
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