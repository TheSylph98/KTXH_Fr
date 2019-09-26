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
          title: "Khai Báo Đơn vị",
          to: "/donvi/donvi"
        },
        {
          icon: "mdi-apps",
          title: "Chức năng phần mềm",
          to: "/tacnhan/tacnhan_chucnangphanmem"
        },
         {
          icon: "mdi-apps",
          title: "Khai Báo Tác Nhân",
          to: "/tacnhan/tacnhan"
        },
        {
          icon: "mdi-apps",
          title: "Khai Báo Người dùng",
          to: "/user/User"
        },
        {
          icon: "mdi-apps",
          title: "Tỉnh, Huyện, Xã, Đơn Vị Nhóm",
          to: "/huyen/huyen"
        },
        {
          icon: "mdi-apps",
          title: "Nhóm Chi Tiêu",
          to: "/nhomchitieu/nhomchitieuKTXH"
        },
        {
          icon: "mdi-apps",
          title: "Khai Báo Kỳ Báo Cáo",
          to: "/baocao/kybaocao"
        },
        {
          icon: "mdi-apps",
          title: "Khai Báo Chỉ tiêu KTXH",
          to: "/chitieu/chitieu"
        }, 
        {
          icon: "mdi-apps",
          title: "Khai Báo Nhóm Chỉ Tiêu KTXH",
          to: "/chitieu/chitieu_phanto"
        }, 
        {
          icon: "mdi-apps",
          title: "Khai Báo Phân Tổ",
          to: "/phanto/phanto"
        }, 
        {
          icon: "mdi-apps",
          title: "Phân Tổ Chi Tiết",
          to: "/phanto/phantochitiet"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Chi Tiêu",
          to: "/bieunhaplieu/bieunhaplieu_chitieu"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Kỳ Báo Cáo",
          to: "/bieunhaplieu/bieunhaplieu_kybaocao"
        }, 
        {
          icon: "mdi-apps",
          title: "Biểu Nhập Liệu Trường Dữ Liệu",
          to: "/bieunhaplieu/bieunhaplieu_truongdulieu"
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