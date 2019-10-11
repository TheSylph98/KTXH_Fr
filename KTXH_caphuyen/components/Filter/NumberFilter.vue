<template>
  <div class="string-filter" :style="`width: ${width}` ">
    <v-text-field :value="text" @change="filterFunction" @keydown="keyDownFunction">
      <template slot="append-outer">
        <v-menu :close-delay="3000" :close-on-content-click="false" offset-y dense>
          <template v-slot:activator="{ on }">
            <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
          </template>
          <v-list width="12em" dense>
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
import { numberOperators } from "@/util/operators";

export default {
  props: {
    width: {
      type: String,
      default: "auto"
    }
  },

  data() {
    return {
      operators: numberOperators,
      choosenOperator: numberOperators[0],
      text: ""
    };
  },

  methods: {
    filterFunction(event) {
      const evtValue = this.choosenOperator.filter(event);

      this.$emit("change", evtValue);
    },

    keyDownFunction(e) {
      if (e.code === "Enter") {
        const evtValue = this.choosenOperator.filter(this.text);

        this.$emit("enter", evtValue);
      }
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