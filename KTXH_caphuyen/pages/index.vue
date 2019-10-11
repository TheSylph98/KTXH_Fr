<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Dropdown</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <p>
      String:
      <StringFilter />
    </p>
    <p>
      Number:
      <NumberFilter />
    </p>
    <p>
      Date:
      <DateFilter />
    </p>
  </div>
</template>

<script>
import StringFilter from "@/components/Filter/StringFilter";
import NumberFilter from "@/components/Filter/NumberFilter";
import DateFilter from "@/components/Filter/DateFilter";

export default {
  components: {
    StringFilter: StringFilter,
    NumberFilter: NumberFilter,
    DateFilter: DateFilter
  },

  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
</script>
