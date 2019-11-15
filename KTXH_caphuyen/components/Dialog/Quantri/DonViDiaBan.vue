<template>
  <div>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="items"
          :selection-type="selectionType"
          selectable
          return-object
          load-children
          loading-icon
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="6">
        <template v-if="!selection.length">No nodes selected.</template>
        <template v-else>
          {{ selection }}
          <div v-for="node in selection" :key="node.id">{{ node.name }}</div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectionType: "left",
    selection: [],
    items: [
      {
        id: 1,
        name: "Root",
        children: [
          { id: 2, name: "Child #1" },
          { id: 3, name: "Child #2" },
          {
            id: 4,
            name: "Child #3",
            children: [
              { id: 5, name: "Grandchild #1" },
              { id: 6, name: "Grandchild #2" }
            ]
          }
        ]
      }
    ]
  })
};
</script>