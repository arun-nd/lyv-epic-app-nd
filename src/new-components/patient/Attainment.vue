<template>
  <v-flex xs12 sm6 px-2>
    <div class="py-2 label">
      <slot name="label"></slot>
    </div>
    <PercentageGraph visible :data="graphData" />
  </v-flex>
</template>

<script>
import PercentageGraph from "@/components/PercentageGraph";

export default {
  name: "Attainment",

  components: { PercentageGraph },

  props: {
    suggestedMetric: { type: Number, required: true },
    successMetric: { type: Number, required: true },
  },

  computed: {
    graphData() {
      return [
        {
          x: [this.suggestedMetric, this.successMetric],
          y: ["recommended", "current"],
          type: "bar",
          orientation: "h",
          marker: {
            color: ["#CA8861", "#675193"],
          },
        },
      ];
    },
  },
};
</script>
