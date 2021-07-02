<template>
  <div>
    <Card title="Dose Recommendation" :loading="saving || loading">
      <DosageInfo
        :general-details="patientDetails.generalDetails"
        :dose-details="patientDetails.dosedetails"
      />
      <ModifyDosage
        :general-details="patientDetails.generalDetails"
        :dose-details="patientDetails.dosedetails"
        :suggested-dose-details="patientDetails.suggested_dosedetails"
        :enable-navigation="enableNavigation"
        :saving="saving"
        v-on="$listeners"
      />
      <TargetAttainment
        v-if="!loading"
        :suggested-metrics="patientDetails.suggestedSuccessMetrics"
        :success-metrics="patientDetails.successMetrics"
        :auc-target="aucTarget"
      />
      <hr />
      <PKParameters
        :success-metrics="patientDetails.successMetrics"
        :pk-parameters="patientDetails.pkparameters"
      />
    </Card>
  </div>
</template>

<script>
import Card from "@/new-components/ui/Card";
import DosageInfo from "@/new-components/patient/DosageInfo";
import ModifyDosage from "@/new-components/patient/ModifyDosage";
import TargetAttainment from "@/new-components/patient/TargetAttainment";
import PKParameters from "@/new-components/patient/PKParameters";
import { get } from "lodash";

export default {
  name: "DoseRecommendationTab",

  components: {
    PKParameters,
    TargetAttainment,
    DosageInfo,
    ModifyDosage,
    Card,
  },

  props: {
    loading: { type: Boolean, required: true },
    saving: { type: Boolean, required: true },
    enableNavigation: { type: Boolean, required: true },
    patientDetails: { type: Object, required: true },
  },

  computed: {
    aucTarget() {
      return get(this.patientDetails, "generalDetails.dailyAucTarget", 500);
    },
  },
};
</script>

<style scoped>
hr {
  opacity: 0.1;
}
</style>
