<template>
    <v-card>
        <v-card-title>
          <span class="headline">Thêm Mới</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ma" label="Mã Đơn Vị*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tên Đơn Vị*"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.donViChaId" label="Đơn Vị Cha*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.diaChi" label="Địa Chỉ"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.soDienThoai" label="Số Điện Thoại"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.laDonVi" class="ma-1" label="Là Đơn Vị"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.hieuLuc" class="ma-1" label="Hiệu lực"></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.xoa" class="ma-1" label="Xóa"></v-switch>
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
</template>
<script>
export default {
    
}
</script>