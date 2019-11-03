<template>
  <v-app class="ktxh">
    <v-app-bar app :clipped-left="$vuetify.breakpoint.mdAndUp" color="#B00020" dark>
      <v-app-bar-nav-icon @click.stop="clickMenuIcon"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">
        VNQT&nbsp;
        <span class="font-weight-light">KTXH</span>
      </span>
      <v-text-field solo-inverted flat hide-details label="Tìm kiếm">
        <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
      </v-text-field>
      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon color="yellow">mdi-bell</v-icon>
      </v-btn>

      <UserBar />
    </v-app-bar>

    <SlideBar :menuParams="{ miniVariant: miniVariant, drawer: drawer}" @closeMenu="changeDrawer" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import SlideBar from "../components/Bars/SlideBar";
import UserBar from "../components/Bars/UserBar";

export default {
  components: {
    SlideBar: SlideBar,
    UserBar: UserBar
  },

  data() {
    return {
      miniVariant: false,
      extended: true,
      right: true,
      drawer: true
    };
  },

  methods: {
    clickMenuIcon() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.miniVariant = !this.miniVariant;
      } else {
        this.miniVariant = false;
      }

      this.drawer = true;
    },

    changeDrawer(value) {
      this.drawer = value;
    }
  }
};
</script>

<style lang="scss">
.ktxh {
  .v-list {
    .v-list-item {
      .v-list-item__action {
        margin-right: 5%;
      }
    }

    .v-list-group {
      .v-list-item__icon {
        margin-right: 5%;
      }
    }
  }
}

.ktxh .v-list--dense.v-list--nav .v-list-group--no-action {
  .v-list-group__items {
    div {
      .v-list-item {
        padding-left: 15%;
      }
    }
  }
}
</style>