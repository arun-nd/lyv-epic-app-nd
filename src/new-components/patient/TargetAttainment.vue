<template>
  <v-flex>
    <div class="title">Target Attainment</div>
    <v-layout row>
      <template v-for="field in fields">
        <component
          :is="field.type"
          :key="field.key"
          :suggested-metric="suggestedMetric(field.key)"
          :success-metric="successMetric(field.key)"
        >
          <template slot="label">
            <span v-html="field.label"></span>
            <span v-if="field.showComputedAUC">{{ aucTargetLabel }}</span>
          </template>
        </component>
      </template>
    </v-layout>
  </v-flex>
</template>

<script>
import Attainment from "@/new-components/patient/Attainment";
import { get } from "lodash";

export default {
  name: "TargetAttainment",

  data() {
    return {
      fields: [
        {
          type: "attainment",
          label: "10mg/L < C<sub>trough</sub> < 20mg/L",
          key: "metric1",
        },
        {
          type: "attainment",
          label: "C<sub>trough</sub> > 20mg/L",
          key: "metric2",
        },
        {
          type: "attainment",
          showComputedAUC: true,
          label: "AUC > ",
          key: "metric3",
        },
        {
          type: "attainment",
          showComputedAUC: true,
          label: "10mg/L < C<sub>trough</sub> < 20mg/L and AUC > ",
          key: "metric4",
        },
      ],
    };
  },

  components: { Attainment },

  props: {
    suggestedMetrics: { type: Object, required: true },
    successMetrics: { type: Object, required: true },
    aucTarget: { type: [Number, String], required: true },
  },

  computed: {
    aucTargetLabel() {
      return `${this.aucTarget}mg hours/L`;
    },
  },

  methods: {
    suggestedMetric(key) {
      return get(this.suggestedMetrics, key, 0);
    },
    successMetric(key) {
      return get(this.successMetrics, key, 0);
    },
  },
};
</script>
