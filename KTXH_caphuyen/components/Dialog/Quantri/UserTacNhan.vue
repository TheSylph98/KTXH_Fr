<template>
  <div>
   <Table
    :title="title"
    :headers="headers"
    :items="tacNhanList"
    :pagination="pagination"
    isInDialog 
    :snackbar="snackbar"
    :notifiedType="notifiedType"
    :notification="notification"
    :timeout="timeout"
    :tableWidth="{
      'checkbox': '2.25%',
      'index': '4.25%',
      'action': '8.5%'
    }"
    @pick="chonTacNhan($event)"
    @filter="getTacNhanList({queryData: $event})"
    @changePageSize="changeList({ pageSize: $event})"
    @changePage="changeList({ page: $event})"
   >

    <template v-slot:action="{ row }">
      <p>{{ selItems }}</p>
      <v-checkbox dense v-model="selItems" :value="row.item.id" > </v-checkbox>
    </template>

    

   </Table>

  </div>
</template>

<script>
import Table from "@/components/table";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Table,
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      isSelect: false,
      snackbar: false,
      dialog: false,
      notifiedType: "success",
      notification: "",
      selItems : [],
      overlay:false,
      timeout: 1000,
      headers: [
        {
          text: "Tên tác nhân",
          align: "center",
          sorttable: false,
          value: "ten",
          width: "34%",
          type: "string"
        }
      ],

    }
  },
  computed: {
    ...mapState("quantri/qtTacNhan",["tacNhanList", "tacNhan", "pagination"]),
    ...mapState("quantri/qtUser_TacNhan", ["userTacNhanList","userTacNhan","pagination"]),
    
  },

  async created() {
    if (!this.tacNhanList.length) {
      this.overlay = true;
      await this.getTacNhanList();
      this.overlay = false;
    }
  },

  methods: {
    ...mapActions("quantri/qtTacNhan", [
      "getTacNhanList",
      "getQTTacNhan"
    ]),
    ...mapActions("quantri/qtUser_TacNhan", 
      [
        "getUserTacNhanList",
        "getQTUserTacNhan",
        "addQTUserTacNhan",
        "updateQTUserTacNhan",
        "deleteQTUserTacNhan",
      ]),

    async changeList(value) {
      value.pageSize = value.pageSize !== undefined
        ? value.pageSize
        : this.pagination.pageSize;
      value.page = value.page !== undefined  ? value.page : this.pagination.page;
      this.overlay = true;
      await this.getTacNhanList(value);
      this.overlay = false;
    },

    //
    async chonTacNhan(item) {

      this.notifiedType = "success";
      this.notification = "Chọn thành công!";

      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
      
      this.selItems = []; 
    },
    //
    changeSelectItem(value, element) {
      if (value) {
        this.selItems.push(element);
      } else {
        const index = this.selItems.findIndex(
          item => item.id === element.id
        );
        this.selItems.splice(index, 1);
      }
    },

  }
}
</script>