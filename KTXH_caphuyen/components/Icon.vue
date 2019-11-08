<template>
  <span>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon small v-on="on" @click="$emit('click')">{{ btnIcon }}</v-icon>
      </template>
      <span>{{ btnTooltip }}</span>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  props: {
    btnTooltip: {
      type: String
    },
    btnIcon: {
      type: String
    }
  }
};
</script>