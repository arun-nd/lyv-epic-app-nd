<template>
  <div>
    <Card title="Patient" :loading="loading">
      <PatientBasic
        ref="patientBasic"
        :new-patient="newPatient"
        :existing-patient-details.sync="generalDetails"
        :schema="schema"
      />
    </Card>
    <Card title="Patient Information" :loading="loading">
      <PatientInformation
        ref="patientInformation"
        :existing-dose-details.sync="doseDetails"
        :existing-patient-details.sync="generalDetails"
        :patient-model="patientModel"
        :schema="schema"
        @validated="onValidated"
      />
    </Card>
    <Card title="Events" :loading="loading">
      <EventTable
        :general-details="generalDetails"
        :existing-events.sync="events"
        :patient-model="patientModel"
      />
    </Card>
  </div>
</template>

<script>
import Card from "@/new-components/ui/Card";
import PatientBasic from "@/new-components/patient/PatientBasic";
import PatientInformation from "@/new-components/patient/PatientInformation";
import EventTable from "@/new-components/patient/EventTable";
import { Http } from "@/services/service";

export default {
  name: "PatientInformationTab",

  components: {
    Card,
    PatientBasic,
    PatientInformation,
    EventTable,
  },

  props: {
    newPatient: { type: Boolean, required: true },
    loading: { type: Boolean, required: true },
    patientModel: { type: String, default: "" },
    generalDetails: { type: Object, required: true },
    doseDetails: { type: Object, required: true },
    events: { type: Array, required: true },
  },

  data() {
    return { schema: [] };
  },

  created() {
    const { treatment } = this.$route.params;
    this.fetchSchema(treatment);
  },

  methods: {
    async fetchSchema(treatment) {
      try {
        const resp = await new Http({ auth: true }).get(
          `patient/getSchema/${treatment}`
        );
        if(resp.data){
          if(resp.data.fieldParameters.length > 0){
            this.schema = resp.data.fieldParameters;
          } else{
            // this.$store.commit("snackbar/setSnack",`Drug name ${resp.data.name} not yet supported`);
             this.$router.push({ name: "Condition" });
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    triggerValidate() {
      this.$refs.patientInformation.validate = false;
      this.$refs.patientBasic.validate = false;
      this.$nextTick(() => {
        this.$refs.patientInformation.validate = true;
        this.$refs.patientBasic.validate = true;
      });
    },
    onValidated() {
      const isValid =
      this.$refs.patientInformation.formValid &&
      this.$refs.patientBasic.formValid;
      this.$emit("valid", isValid);
    },
  },
};
</script>
