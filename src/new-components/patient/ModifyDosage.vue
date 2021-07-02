<template>
  <div class="py-3">
    <v-btn
      color="primary"
      outlined
      :disabled="editMode"
      @click="$emit('modifyDose')"
    >
      Modify Dose
    </v-btn>
    <div v-show="editMode" class="py-3">
      <div class="title">Dose Details</div>
      <DosageInfo
        is-suggested
        :general-details="generalDetails"
        :dose-details="suggestedDoseDetails"
        v-on="$listeners"
      />
      <v-form v-model="validDosage">
        <v-layout row pa-4>
          <v-flex xs12 sm6 lg4 xl3 pr-4>
            <NumberInput
              v-model="doseDetails.individualDose"
              append-text="mg"
              label="Dosing Regimen"
              required
              :validate="validate"
            />
          </v-flex>
          <v-flex xs12 sm6 lg4 xl3 pr-4>
            <Dropdown
            id="Dosing Interval"
              v-model="doseDetails.interval"
              append-text="hours"
              label="Dosing Interval"
              :items="[6, 8, 12, 18, 24, 36, 48]"
              required
              :validate="validate"
            />
          </v-flex>
          <v-flex xs12 sm6 lg4 xl3 pr-4>
            <Dropdown
            id="Infusion Duration"
              v-model="doseDetails.duration"
              append-text="minutes"
              label="Infusion Duration"
              :items="[30, 60, 90, 120, 180]"
              required
              :validate="validate"
            />
          </v-flex>
        </v-layout>
      </v-form>
      <hr />
      <v-layout row pa-4>
        <v-flex xs12 sm6 lg4 xl3 pr-4>
          <NumberInput
            append-text="mg/kg"
            label="Dosing Regimen/weight"
            :value="doseByWeight(doseDetails.individualDose)"
            disabled
          />
        </v-flex>
        <v-flex xs12 sm6 lg4 xl3 pr-4>
          <NumberInput
            append-text="mg"
            label="Total Daily Dose"
            :value="dailyDose"
            disabled
          />
        </v-flex>
        <v-flex xs12 sm6 lg4 xl3 pr-4>
          <NumberInput
            append-text="mg/kg"
            label="Total Daily Dose/weight"
            :value="doseByWeight(dailyDose)"
            disabled
          />
        </v-flex>
      </v-layout>
      <v-btn color="primary" :loading="saving" @click="onRecalculate">
        Recalculate Metrics
      </v-btn>
    </div>
  </div>
</template>

<script>
import DosageInfo from "@/new-components/patient/DosageInfo";
import NumberInput from "@/new-components/ui/NumberInput";
import Dropdown from "@/new-components/ui/Dropdown";
import { get } from "lodash";

export default {
  name: "ModifyDosage",

  components: { Dropdown, DosageInfo, NumberInput },

  props: {
    generalDetails: { type: Object, required: true },
    doseDetails: { type: Object, required: true },
    suggestedDoseDetails: { type: Object, required: true },
    enableNavigation: { type: Boolean, required: true },
    saving: { type: Boolean, required: true },
  },

  data() {
    return {
      validate: false,
      validDosage: true,
    };
  },

  computed: {
    editMode() {
      return !this.enableNavigation;
    },
    dailyDose() {
      return this.dosage(this.doseDetails);
    },
  },

  methods: {
    onRecalculate() {
      this.validate = true;
      this.$emit("recalculate", this.validDosage);
    },
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

<style scoped>
hr {
  opacity: 0.1;
}
</style>
