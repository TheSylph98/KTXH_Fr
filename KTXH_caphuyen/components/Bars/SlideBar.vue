<template>
  <v-navigation-drawer
    v-model="menuParams.drawer"
    :mini-variant="menuParams.miniVariant"
    :clipped="$vuetify.breakpoint.lgAndUp"
    mini-variant-width="70"
    app
    clipped
    color="grey lighten-4"
    @input="changeDrawer"
  >
    <v-list dense max-height="100%" nav>
      <template v-for="(item, index) in items">
        <v-list-item v-if="!item.children" :key="index" :to="item.to" @click>
          <v-list-item-action>
            <v-tooltip v-if="menuParams.miniVariant" right>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">{{ item.icon }}</v-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-else no-action :value="true">
          <v-menu
            slot="prependIcon"
            v-if="menuParams.miniVariant"
            open-on-hover
            right
            bottom
            offset-x
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{ item.icon }}</v-icon>
            </template>
            <v-list dense nav>
              <v-list-item v-for="(el, inx) in item.children" :key="inx" :to="el.to" @click>
                <v-list-item-title>{{ el.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-icon slot="prependIcon" v-else>{{ item.icon }}</v-icon>
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item v-for="(el, inx) in item.children" :key="inx" :to="el.to">
            <v-list-item-action>
              <v-icon v-text="el.icon"></v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="el.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import slideBar from "./SlideBar1";

export default {
  props: {
    menuParams: {
      type: Object,
      default() {
        return {
          miniVariant: false,
          drawer: true
        };
      }
    }
  },

  data() {
    return {
      items: slideBar
    };
  },

  methods: {
    changeDrawer(value) {
      if (!value) {
        this.$emit("closeMenu", value);
      }
    }
  }
};
</script>