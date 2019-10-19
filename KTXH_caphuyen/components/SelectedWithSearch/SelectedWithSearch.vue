<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :placeholder="placeholder"
    :prepend-icon="icon"
    return-object
    @update:search-input="changeSearch"
    @select="$emit('select', $event)"
  ></v-autocomplete>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },

    itemText: {
      type: String,
      default: "ten"
    },

    itemValue: {
      type: String,
      value: "id"
    },

    label: {
      type: String
    },

    placeholder: {
      type: String,
      default: "Chọn"
    },

    icon: {
      type: String,
      default: "mdi-magnify-outline"
    },

    time: {
      type: Number,
      default: 1000
    }
  },

  data() {
    return {
      model: null,
      search: "",
      isLoading: false
    };
  },

  created() {
    const time = this.time;
    this.changeText = _.debounce(function() {
      this.$emit("search", this.search);
    }, time);
  },

  methods: {
    changeSearch() {
      this.changeText();
    }
  }
};
</script>