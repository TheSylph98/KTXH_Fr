<template>
    <v-card>
        <v-card-title>
          <span class="headline">Thêm Mới</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ma" label="Mã tỉnh*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tỉnh*"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                  :items="donViHanhChinh"
                  v-model="editedItem.sysCapDonViHanhChinhId"
                  label="Cấp đơn vị hành chính"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                  :items="loaidonViHanhChinh"
                  v-model="editedItem.loaiDonViHanhChinh"
                  label="Loại đơn vị hành chính"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.nongThon" class="ma-1" label="Thành Thị - Nông thôn"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.bienGioi" class="ma-1" label="Biên giới"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch v-model="editedItem.haiDao" class="ma-1" label="Hải đảo"></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch
                  v-model="editedItem.vungDBKhoKhan"
                  class="ma-1"
                  label="Vùng đặc biệt khó khăn"
                ></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="12">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
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