<template>
  <v-flex xs12 class="text-body-1">
    <b v-if="isSuggested">Suggested: </b>
    <span :class="{ 'font-weight-bold': !isSuggested }">Total daily dose</span>
    of
    <b>{{ dailyDose }}mg</b>
    ({{ doseByWeight(dailyDose) }}mg/kg) at
    <b>{{ doseDetails.individualDose }}mg</b>
    ({{ doseByWeight(doseDetails.individualDose) }}mg/kg) every
    <b> {{ doseDetails.interval }} hours </b>
    (infused over
    <span :class="{ 'font-weight-bold': !isSuggested }">
      {{ doseDetails.duration }} minutes</span
    >).
    <v-btn
      v-if="isSuggested"
      small
      text
      color="primary"
      @click="$emit('applySuggestion')"
    >
      Apply
    </v-btn>
  </v-flex>
</template>

<script>
import { get } from "lodash";

export default {
  name: "DosageInfo",

  props: {
    isSuggested: { type: Boolean, default: false },
    generalDetails: { type: Object, required: true },
    doseDetails: { type: Object, required: true },
  },

  computed: {
    dailyDose() {
      return this.dosage(this.doseDetails);
    },
  },

  methods: {
    dosage(item) {
      const dose = get(item, "individualDose", 0);
      const interval = get(item, "interval", 0);
      return ((24 * dose) / interval).toFixed(0);
    },
    doseByWeight(dose) {
      const weight = get(this.generalDetails, "weight", 0);
      return (dose / weight).toFixed(0);
    },
  },
};
</script>
