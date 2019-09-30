<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-avatar color="red" v-on="on">
        <span class="white--text headline">MN</span>
      </v-avatar>
    </template>

    <v-card dense>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Mung Nguyen</v-list-item-title>
            <v-list-item-subtitle>mung@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in userItems" :key="index">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import userBar from "./userBar";

export default {
  data() {
    return {
      userItems: userBar
    };
  }
};
</script>