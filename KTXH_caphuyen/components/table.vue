<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"

  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider
          class="mx-3"
          inset
          vertical
        ></v-divider>

        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Thêm mới</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <slot></slot>
                  <v-switch
                    v-model="hieuLuc"
                    class="ma-1"
                    label="Hiệu lực"
                  ></v-switch>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="$close">Đóng</v-btn>
              <v-btn color="blue darken-1" text @click="$save">Lưu</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >mdi-pencil</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  
</template>

<script>
  export default {
    props: {
      dialog: {
          type: Boolean,
          default: false
      },
      headers: {
          type: Object,
      },
      items: {
          type: Object
      },
      editedIndex: {
          type: Number,
      },
      editedItem: {
          type: Object
      },
      defaultItem: {
          type: Object
      },
      hieuLuc: {
          type: Boolean
      },
      title: {
          type: String
      },
      formTitle: {
          type: Object
      }
    },
    
    methods: {
      edit() {
       this.$emit('edit')
      },
    }
    
  }
</script>