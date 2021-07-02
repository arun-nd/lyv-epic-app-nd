<template>
  <div class="d-flex d-inline-flex">
    <v-layout wrap>
      <template v-if="type === 'Dose'">
        <v-flex xs12 py-1><b>Dose:</b> {{ dose }} mg</v-flex>
        <v-flex xs12 py-1><b>Duration:</b> {{ duration }} min</v-flex>
      </template>
      <template v-else>
        <v-flex xs12 py-1><b>Height:</b> {{ height }} cm</v-flex>
        <v-flex xs12 py-1><b>Weight:</b> {{ weight }} kg</v-flex>
        <v-flex xs12 py-1><b>SCr:</b> {{ scr }} mg/dL</v-flex>
        <v-flex xs12 py-1><b>Level:</b> {{ level }} mg/L</v-flex>
      </template>
    </v-layout>
    <div class="d-flex flex-column justify-center ml-2">
      <v-icon v-if="mutable" class="pb-2" small @click="$emit('delete')">
        delete
      </v-icon>
      <v-icon v-if="mutable" small @click="$emit('edit')"> edit </v-icon>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";

export default {
  name: "EventValue",

  props: {
    type: { type: String, required: true },
    values: { type: Object, required: true },
    mutable: { type: Boolean, required: true },
  },

  computed: {
    dose() {
      return get(this.values, "dose", "");
    },
    duration() {
      return get(this.values, "duration", "");
    },
    height() {
      return get(this.values, "height", "n/a");
    },
    weight() {
      return get(this.values, "weight", "n/a");
    },
    scr() {
      return get(this.values, "scr", "n/a");
    },
    level() {
      return get(this.values, "dv", "n/a");
    },
  },
};
</script>
