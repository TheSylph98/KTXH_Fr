<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    :item-text="itemText"
    :label="label"
    :placeholder="placeholder"
    :prepend-icon="icon"
    return-object
    @update:search-input="changeSearch"
    @input="$emit('select', $event)"
  ></v-autocomplete>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    itemObj: {
      type: Object,
      default: {}
    },

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
      text: "",
      isLoading: false,
      isChoosedItem: false
    };
  },

  created() {
    const time = this.time;
    let flag = !this.isChoosedItem
    this.changeText = _.debounce(function() {
      console.log("search", this.text)
      this.$emit("search", this.text);
      }, time);

    if (Object.keys(this.itemObj).length) {
      this.model = this.itemObj
    }
  },

  methods: {
    changeSearch() {
      if (this.text !== this.search) {
        this.text = this.search
        this.changeText()
      }
      this.isChoosedItem = true
    }
  }
};
</script>