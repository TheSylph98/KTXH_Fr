<template>
  <div>
    <p>Ahihiihihi</p>
    <v-form ref="kyBaoCaoForm">
      <v-text-field v-model="kyBaoCaoForm.ma" label="Mã" required></v-text-field>
      <v-text-field v-model="kyBaoCaoForm.ten" label="Kỳ báo cáo" required></v-text-field>
      <v-menu>
        <v-date-picker v-model="kyBaoCaoForm.ngayBatDau" label="Ngày bắt đầu"></v-date-picker>
      </v-menu>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kyBaoCaoForm: {
        ma: "",
        ten: "",
        ngayBatDau: "",
        ngayBaoCaoHuyen: "",
        ngayBaoCaoTinh: "",
        ngayBaoCaoTW: "",
        ngayDong: "",
        ngayTongHop: "",
        ghiChu: "",
        hieuLuc: ""
      }
    };
  }
};
</script>