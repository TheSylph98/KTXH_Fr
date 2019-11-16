<template>
  <div class="string-filter" :style="{ width: width }">
    <!-- month picker -->
    <div v-if="choosenOperator.operator === 'equal-month-year'">
      <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field
            dense
            v-model="date"
            prepend-icon="mdi-calendar-month"
            readonly
            v-on="on"
            @change="filterFunction"
            @keydown="keyDownFunction"
          >
            <template slot="append-outer">
              <v-menu dense :close-delay="3000" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ on }">
                  <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
                </template>
                <v-list width="12em" dense>
                  <v-list-item
                    dense
                    v-for="(item, index) in operators"
                    :key="index"
                    @click="changeChoosenOperator(item)"
                  >
                    <v-list-item-title>
                      <v-row>
                        <v-col cols="2">
                          <v-icon
                            size="1.5em"
                            v-if="choosenOperator.operator === item.operator"
                          >mdi-check</v-icon>
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
        </template>
        <v-date-picker
          dense
          v-model="date"
          type="month"
          no-title
          scrollable
          @click:month="saveMonth"
        ></v-date-picker>
      </v-menu>
    </div>

    <!-- year picker -->
    <div v-else-if="this.choosenOperator.operator === 'equal-year'">
      <v-select
        v-model="date"
        :items="items"
        dense
        prepend-icon="mdi-calendar-month"
        :filter="filterSelect"
        @change="filterFunction"
        @keydown="keyDownFunction"
      >
        <template slot="append-outer">
          <v-menu :close-delay="3000" :close-on-content-click="false" offset-y dense>
            <template v-slot:activator="{ on }">
              <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
            </template>
            <v-list width="12em" dense>
              <v-list-item
                v-for="(item, index) in operators"
                :key="index"
                @click="changeChoosenOperator(item)"
              >
                <v-list-item-title>
                  <v-row>
                    <v-col cols="2">
                      <v-icon
                        size="1.5em"
                        v-if="choosenOperator.operator === item.operator"
                      >mdi-check</v-icon>
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
      </v-select>
    </div>

    <!-- between two day -->
    <div v-else-if="choosenOperator.operator === 'between'">
      <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateRangeText"
            prepend-icon="mdi-calendar-month"
            readonly
            v-on="on"
            @change="filterFunction"
            @keydown="keyDownFunction"
          >
            <template slot="append-outer">
              <v-menu :close-delay="3000" :close-on-content-click="false" offset-y dense>
                <template v-slot:activator="{ on }">
                  <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
                </template>
                <v-list width="12em" dense>
                  <v-list-item
                    v-for="(item, index) in operators"
                    :key="index"
                    @click="changeChoosenOperator(item)"
                  >
                    <v-list-item-title>
                      <v-row>
                        <v-col cols="2">
                          <v-icon
                            size="1.5em"
                            v-if="choosenOperator.operator === item.operator"
                          >mdi-check</v-icon>
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
        </template>
        <v-date-picker v-model="date" range no-title scrollable @click:date="saveTwoDate"></v-date-picker>
      </v-menu>
    </div>

    <!-- picker with day-->
    <v-menu
      v-else
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-text-field v-model="date" prepend-icon="mdi-calendar-month" v-on="on">
          <template slot="append-outer">
            <v-menu :close-delay="3000" :close-on-content-click="false" offset-y dense>
              <template v-slot:activator="{ on }">
                <v-icon size="16" dense v-on="on">mdi-filter</v-icon>
              </template>
              <v-list width="12em" dense>
                <v-list-item
                  v-for="(item, index) in operators"
                  :key="index"
                  @click="changeChoosenOperator(item)"
                >
                  <v-list-item-title>
                    <v-row>
                      <v-col cols="2">
                        <v-icon
                          size="1.5em"
                          v-if="choosenOperator.operator === item.operator"
                        >mdi-check</v-icon>
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
      </template>
      <v-date-picker @click:date="filterFunction" v-model="date" no-title @input="menu = false"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { dateOperators } from "@/util/operators";

export default {
  props: {
    width: {
      type: String,
      default: "auto"
    }
  },

  data() {
    return {
      operators: dateOperators,
      choosenOperator: dateOperators[0],
      date: "",
      dates: ["2019-11-10", "2019-11-11"],
      menu: false,
      clickDate: false
    };
  },

  computed: {
    dateType() {
      if (this.choosenOperator.operator === "equal-month-year") return "month";
      else return "date";
    },

    items() {
      const items = [];
      const year = Number(new Date().getFullYear());
      for (let i = -25; i <= 25; i++) {
        items.push(year + i);
      }
      return items;
    },

    dateRangeText() {
      if (Array.isArray(this.date)) return this.date.sort().join(" ~ ");
      else return "";
    }
  },

  methods: {
    changeChoosenOperator(item) {
      this.choosenOperator = item;

      if (item.operator === "equal-year")
        this.date = Number(new Date().getFullYear());
      else if (item.operator === "between")
        this.date = ["2019-10-10", "2019-10-11"];
      else this.date = "";
    },

    filterFunction(event) {
      const evtValue = this.choosenOperator.filter(event);

      this.$emit("change", evtValue);
    },

    keyDownFunction(e) {
      if (e.code === "Enter") {
        const evtValue = this.choosenOperator.filter(this.text);

        this.$emit("enter", evtValue);
      }
    },

    saveMonth(month) {
      this.date = month;
      this.menu = false;
      this.filterFunction(this.date);
    },

    saveTwoDate(date) {
      if (!this.clickDate) {
        this.clickDate = true;
      } else {
        this.menu = false;
        this.clickDate = false;
      }
      this.filterFunction(this.date);
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

  .v-text-field__details {
    display: none;
  }
}
</style>