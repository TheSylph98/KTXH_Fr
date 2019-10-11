<template>
    <v-card>
        <v-card-title>
          <span class="headline">Thêm Mới Tác Nhân</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ma" label="Mã"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tên tác nhân"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.sysCapHanhChinhId" label="Cấp hành chính"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Chức năng, Nhiệm vụ"></v-textarea>
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