<template>
  <div class="string-filter" :style="`width: ${width}em` ">
    <v-text-field :value="text" :loading="loading" @change="filterFunction">
      <template slot="append-outer">
        <v-menu :close-delay="3000" :close-on-content-click="false" offset-y dense>
          <template v-slot:activator="{ on }">
            <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
          </template>
          <v-list width="10em" dense>
            <v-list-item
              v-for="(item, index) in operators"
              :key="index"
              @click="choosenOperator = item"
            >
              <v-list-item-title>
                <v-row>
                  <v-col cols="2">
                    <v-icon size="1.5em" v-if="choosenOperator.operator === item.operator">mdi-check</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span>{{ item.label }}</span>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { stringOperators } from "@/util/operators";

export default {
  props: {
    width: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      operators: stringOperators,
      choosenOperator: stringOperators[0],
      loading: false,
      text: ""
    };
  },

  methods: {
    filterFunction(event) {
      this.loading = true;
      const time = 1000;
      //   await setTimeout(function() {
      //     console.log("event", event);
      //     console.log("time", time);
      //     console.log("Loading", this.loading);
      //   }, time);
      this.loading = false;
      console.log("abc", event);
    }
  }
};
</script>

<style lang="scss">
.string-filter {
  .v-text-field {
    .v-input__append-outer {
      margin: auto;
    }
  }
}
</style>