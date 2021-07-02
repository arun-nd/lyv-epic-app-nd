<template>
  <v-layout>
    <v-flex xs6>
      <NumberInput label="Age" :value="years" append-text="years" disabled />
    </v-flex>
    <v-flex xs6 pl-5>
      <NumberInput :value="days" append-text="days" disabled />
    </v-flex>
  </v-layout>
</template>

<script>
import NumberInput from "@/new-components/ui/NumberInput";

export default {
  name: "PatientAge",

  components: {
    NumberInput,
  },

  props: {
    years: null,
    days: null,
  },
};
</script>
