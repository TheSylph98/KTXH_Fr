<template>
    <v-data-table
      v-model="selectItems"
      :headers="headers"
      :items="items"
      show-select
      hide-default-footer
      dense
      :items-per-page="200"
    >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-3" inset vertical></v-divider>

          <div class="flex-grow-1"></div>
          <v-btn v-if="selectItems.length" class="mb-2" @click="dialog = true">Chọn</v-btn>
          <slot></slot>
        </v-toolbar>
      </template>


    </v-data-table>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      title: "",
      selectItems: [],
      dialog: false,
      headers: [
        {
          text: "Tác nhân",
          align: "center",
          sorttable: true,
          value: "name",
          type: "number",
          width: "8.5%"
        },
      ],

    }
  },

}
</script>