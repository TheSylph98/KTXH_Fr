<template>
  <v-app class="my-app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :permanent="permanent"
      color="rgb(159, 211, 224)"
      fixed
      app
    >
    <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app height="100" color="rgb(159, 211, 224)">
      <!-- <v-toolbar :extended="extended"> -->
      <v-row>
        <v-col cols="6" class="header-left">
          <v-row>
            <v-col cols="5">
              <v-img
                :src="require('@/assets/images/logo.png')"
                aspect-ratio="1"
                class="logo"
                max-width="240"
                max-height="90"
              ></v-img>
            </v-col>
            <v-col cols="7" class="header-title">
              <b>HỆ THỐNG THÔNG TIN KINH TẾ XÃ HỘI</b>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="header-right">
          <v-row>
            <v-col cols="7" class="header-title">
              <p>
                <b>UBND HUYỆN CAM LỘC - TỈNH QUẢNG TRỊ</b>
              </p>
            </v-col>
            <v-col cols="5" class="right-title header-title">
              <p>
                <b>PHÒNG KẾ HOẠCH - TÀI CHÍNH</b>
              </p>
              <P>Quản trị</P>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- </v-toolbar> -->
      <!-- <v-toolbar-title v-text="title" />
      <v-spacer />-->
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      permanent: true,
      drawer: false,
      fixed: false,
      items: [
         {
          icon: "mdi-apps",
          title: "Đơn vị",
          to: "/don-vi/don-vi"
        },
        {
          icon: "mdi-apps",
          title: "Tác Nhân Chức năng phần mềm",
          to: "/tac-nhan/tac-nhan_chuc-nang-phan-mem"
        },
         {
          icon: "mdi-apps",
          title: "Tác Nhân",
          to: "/tac-nhan/tac-nhan"
        },
        {
          icon: "mdi-apps",
          title: "Người dùng",
          to: "/user/User"
        },
        {
          icon: "mdi-apps",
          title: "Tỉnh",
          to: "/huyen/tinh"
        },
        {
          icon: "mdi-apps",
          title: "Huyện",
          to: "/huyen/huyen"
        },
        {
          icon: "mdi-apps",
          title: "Xã",
          to: "/huyen/xa"
        },
        {
          icon: "mdi-apps",
          title: "Nhóm Chi Tiêu KTXH",
          to: "/nhom-chi-tieu/nhom-chi-tieu-KTXH"
        },
        {
          icon: "mdi-apps",
          title: "Kỳ Báo Cáo",
          to: "/bao-cao/ky-bao-cao"
        },
        { 
          icon: "mdi-book",
          title: "Chỉ tiêu KTXH",
          to: "/chi-tieu/chi-tieu"
        }, 
        {
          icon: "mdi-apps",
          title: "Nhóm Chỉ Tiêu Phân Tổ",
          to: "/chi-tieu/chi-tieu_phan-to"
        }, 
        {
          icon: "mdi-apps",
          title: "Phân Tổ",
          to: "/phan-to/phan-to"
        }, 
        {
          icon: "mdi-apps",
          title: "Phân Tổ Chi Tiết",
          to: "/phan-to/phan-to-chi-tiet"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Chi Tiêu",
          to: "/bieu-nhap-lieu/bieu-nhap-lieu_chi-tieu"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Kỳ Báo Cáo",
          to: "/bieu-nhap-lieu/bieu-nhap-lieu_ky-bao-cao"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Trường Dữ Liệu",
          to: "/bieu-nhap-lieu/bieu-nhap-lieu_truong-du-lieu"
        }
      ],
      extended: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  }
};
</script>

<style lang="scss">
.logo {
  .v-image__image {
    margin: 5% 0;
  }
}

.header-left {
  * {
    margin: 0;
    padding: 0;
  }

  .header-title {
    padding-top: 3%;
  }
}

.header-right {
  *,
  p {
    margin: 0;
    padding: 0;
  }

  .header-title {
    padding-top: 6%;
  }

  .right-title {
    text-align: right;
  }
}
</style>