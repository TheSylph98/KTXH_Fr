<template>
  <Table
    :title="title"
    :headers="headers"
    :items="huyenList"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)"
  >
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }"></template>
      <Huyen/>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>
  </Table>
</template>

<script>
import Table from "../../components/table.vue";
import { mapState, mapActions } from "vuex";
import Huyen from "@/components/Dialog/Huyen"
export default {
  components: {
    Table,
    Huyen
  },
  data() {
    return {
      title: "Khai Báo Quy Chuẩn: Huyện",
      dialog: false,
      donViHanhChinh: ["Cấp tỉnh", "Cấp huyện", "Cấp Xã", "Đặc khu kinh tế"],
      loaidonViHanhChinh: ["Loại I", "Loại II", "Loại III"],
      headers: [
        {
          text: "Mã",
          align: "center",
          sorttable: true,
          value: "ma",
          type: "string"
        },
        {
          text: "Tên",
          align: "center",
          sorttable: false,
          value: "ten",
          type: "string"
        },
        {
          text: "Ghi Chú",
          align: "center",
          sorttable: false,
          value: "ghiChu",
          type: "string"
        },
        {
          text: "Hiệu lực",
          align: "center",
          sorttable: true,
          value: "hieuLuc",
          type: ""
        }
      ],
      editedIndex: -1,
      editedItem: {
        ma: "",
        ten: "",
        qcTinhId: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: 1,
        bienGioi: 0,
        haiDao: 0,
        vungDBKhoKhan: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      },
      defaultItem: {
        ma: "",
        ten: "",
        qcTinhId: "",
        sysCapDonViHanhChinhId: 0,
        loaiDonViHanhChinh: "",
        nongThon: 1,
        bienGioi: 0,
        haiDao: 0,
        vungDBKhoKhan: 0,
        ghiChu: "",
        hieuLuc: 1,
        xoa: 0
      }
    };
  },
  computed: {
    ...mapState("qcHuyen", ["huyenList", "pagination"]),
    formTitle() {
      return this.editedIndex === -1 ? "Thêm mới" : "Cập nhật chi tiết";
    }
  },

  asyncData({ store }) {
    store.dispatch("qcHuyen/getQCHuyenList");
  },

  created() {
    this.getQCHuyenList();
  },

  methods: {
    ...mapActions("qcHuyen", [
      "getQCHuyenList",
      "getQCHuyen",
      "addQCHuyen",
      "updateQCHuyen",
      "deleteQCHuyen",
      "restoreQCHuyen"
    ]),

    getClass(index) {
      if (!index) return "text-left";
      else return "text-start";
    },
    add() {
      this.dialog = true;
    },
    edit(item) {
      this.addQCHuyen(this.editedIndex);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    delete(tiem) {
      const index = this.items.indexOf(item);
      confirm("Xác nhận xóa?") && this.items.splice(index, 1);
      this.deleteQCHuyen(this.editedItem);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>