<template>
  <v-container class="pb-10">
    <v-layout wrap class="mb-3">
      <v-flex xs9 lg6>
        <span v-for="(tab, index) in tabs" :key="index">
          <v-btn
            color="error"
            depressed
            small
            :text="activeTabIndex !== index"
            :disabled="!enableNavigation"
            @click="activeTabIndex = index"
          >
            {{ tab }}
          </v-btn>
          <span class="mx-3" v-if="index < tabs.length - 1">/</span>
        </span>
      </v-flex>
      <v-flex class="d-flex justify-end" lg5>
        <v-chip v-if="mrn">MRN: {{ mrn }}</v-chip>
      </v-flex>
      <v-flex class="d-flex justify-end" lg1>
        <v-btn
          outlined
          rounded
          small
          color="default"
          :to="`/${conditionId}/treatments/${treatmentId}/patientList`"
        >
          back
        </v-btn>
      </v-flex>
    </v-layout>
    <PatientInformationTab
      ref="patientInformationTab"
      v-show="activeTabIndex === 0"
      :new-patient="newPatient"
      :loading="isLoading"
      :general-details.sync="patient.generalDetails"
      :dose-details.sync="patient.dosedetails"
      :events.sync="patient.schedule"
      :patient-model="patient.model"
      @valid="validateAndRecommend"
    />
    <DoseRecommendationTab
      v-if="isRecommended"
      v-show="activeTabIndex === 1"
      :loading="isLoading"
      :saving="isSaving"
      :patientDetails="patient"
      :enable-navigation="enableNavigation"
      @applySuggestion="onApplySuggestion"
      @recalculate="validateAndRecommend"
      @modifyDose="enableNavigation = false"
    />
    <SummaryTab
      v-if="isRecommended && activeTabIndex === 2"
      :loading="isLoading"
      :graph-data="patient.graphData"
      :events="patient.schedule"
    />
    <ActionButtonToolbar>
      <v-btn v-if="showReset" color="error" @click="getPatient(mrn)">
        Reset
      </v-btn>
      <v-btn
        v-if="showResetValues"
        :loading="isSaving"
        color="error"
        @click="onReset"
      >
        Reset values
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!newPatient" color="secondary" icon @click="printScreen">
        <v-icon>save</v-icon>
      </v-btn>
      <PatientTimeline
        v-if="!newPatient"
        :mrn="mrn"
        :patient-time="timelineActiveTime"
        @loadPatientSavedAt="onLoadPatientSavedAt"
      />
      <v-btn
        v-if="activeTabIndex === 0"
        color="success"
        :loading="isSaving"
        @click="onRecommendDose"
      >
        Recommend Dose
      </v-btn>
      <v-btn
        v-if="activeTabIndex === 1"
        color="success"
        :disabled="!enableNavigation"
        @click="setActiveTab(2)"
      >
        Summary
      </v-btn>
      <v-btn v-if="activeTabIndex === 2" color="success" @click="onSave">
        Save
      </v-btn>
    </ActionButtonToolbar>
  </v-container>
</template>

<script>
import PatientInformationTab from "@/new-components/patient/PatientInformationTab";
import ActionButtonToolbar from "@/components/ActionButtonToolbar";
import DoseRecommendationTab from "@/new-components/patient/DoseRecommendationTab";
import SummaryTab from "@/new-components/patient/SummaryTab";
import PatientTimeline from "@/new-components/patient/PatientTimeline";
import { Http } from "@/services/service";
import * as html2canvas from "html2canvas";
import { get } from "lodash";
import { saveAs } from "file-saver";
import { DateTime } from "luxon";
import { Main } from "@/services/modules";
import moment from "moment";
export default {
  name: "PatientDetails",

  components: {
    PatientTimeline,
    SummaryTab,
    DoseRecommendationTab,
    PatientInformationTab,
    ActionButtonToolbar,
  },

  computed: {
    mrn() {
      return get(this.patient, "generalDetails.mrn", null);
    },
    showReset() {
      if (
        this.newPatient ||
        this.activeTabIndex === 1 ||
        this.activeTabIndex === 2
      ) {
        return false;
      }
      return true;
    },
    showResetValues() {
      if (this.activeTabIndex === 0 || this.activeTabIndex === 2) {
        return false;
      }
      return true;
    },
  },

  data() {
    return {
      enableNavigation: false,
      newPatient: true,
      isRecommended: false,
      conditionId: null,
      treatmentId: null,
      patient: {
        generalDetails: {},
        dosedetails: {
          individualDose: null,
        },
        schedule: [],
        pkparameters: {},
        successMetrics: {},
        suggestedSuccessMetrics: {},
        suggested_dosedetails: {},
        graphData: [],
      },
      defaultDoseDetails: {},
      tabs: ["patient information", "dose recommendation", "summary"],
      activeTabIndex: 0,
      isLoading: false,
      isSaving: false,
      timelineActiveTime: null,
      drugName: null,
    };
  },

  mounted() {
    const { condition, treatment, mrn } = this.$route.params;
    this.conditionId = condition;
    this.treatmentId = treatment;
    this.patient.treatmentId = treatment;
    this.getTreatment(treatment);
    if (mrn) {
      this.isRecommended = true;
      this.setActiveTab(1);
      this.getPatient(mrn);
    }
  },

  watch: {
    "patient.generalDetails.weight"(){
      if (!this.isLoading) {
        if(this.patient.generalDetails.weight != undefined &&  this.patient.generalDetails.weight != "" && this.patient.generalDetails.weight != null && !isNaN(this.patient.generalDetails.weight)){
          this.calcBMI();
          this.fetchComputedValues();
        }
      }
    },
    "patient.generalDetails.height"(){
      if (!this.isLoading) {
         if(this.patient.generalDetails.height != undefined &&  this.patient.generalDetails.height != "" && this.patient.generalDetails.height != null && !isNaN(this.patient.generalDetails.height)){
        this.calcBMI();
        this.fetchComputedValues();
      }
      }
    },
    "patient.generalDetails.scr"() {
      if (!this.isLoading) {
         if(this.patient.generalDetails.scr != undefined &&  this.patient.generalDetails.scr != "" && this.patient.generalDetails.scr != null && !isNaN(this.patient.generalDetails.scr)){
        this.fetchComputedValues();
         }
      }
    },
    "patient.generalDetails.birthday"() {
      if (!this.isLoading) {
         if(moment(this.patient.generalDetails.birthday, "YYYY-MM-DD").isValid() && this.patient.generalDetails.birthday != undefined &&  this.patient.generalDetails.birthday != "" && this.patient.generalDetails.birthday != null && !isNaN(this.patient.generalDetails.birthday)){
        this.fetchComputedValues();
         }
      }
    },
    "patient.generalDetails.gender"() {
      if (!this.isLoading) {
         if(this.patient.generalDetails.gender != undefined &&  this.patient.generalDetails.gender != "" && this.patient.generalDetails.gender != null && !isNaN(this.patient.generalDetails.gender)){
        this.fetchComputedValues();
      }
      }
    },
    patient: {
      deep: true,
      handler() {
        this.enableNavigation = false;
      },
    },
  },

  methods: {
    async getTreatment(treatment) {
      const resp = await Main.getTreatment(treatment);
      this.drugName = get(resp, "data.name", "");
    },
    onApplySuggestion() {
      Object.assign(
        this.patient.dosedetails,
        this.patient.suggested_dosedetails
      );
    },
    setActiveTab(index) {
      this.activeTabIndex = index;
    },
    async getPatient(mrn) {
      this.isLoading = true;
      try {
        const resp = await new Http({
          auth: true,
        }).post("/patient/getPatientDetails", {
          mrn,
          time: this.timelineActiveTime,
        });
        const patient = get(resp, "data.0", {});
        const patientTime = new Date(patient.time).valueOf();
        this.patient = {
          ...this.patient,
          model: patient.treatmentParameters.model,
          dosedetails: patient.treatmentParameters.dosedetails,
          generalDetails: patient.generalDetails,
          graphData: patient.treatmentParameters.graphData,
          pkparameters: patient.treatmentParameters.pkparameters,
          schedule: patient.treatmentParameters.schedule,
          successMetrics: patient.treatmentParameters.successMetrics,
          suggestedSuccessMetrics:
            patient.treatmentParameters.suggestedSuccessMetrics,
          suggested_dosedetails:
            patient.treatmentParameters.suggested_dosedetails,
          time: patientTime,
        };
        this.timelineActiveTime = patientTime;
        this.newPatient = false;
        await this.fetchComputedValues();
        this.calcBMI();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.enableNavigation = true;
        });
      }
    },
    async fetchComputedValues() {
    if(this.validationFor()){
       await Promise.all([
        this.fetchValue(this.patient.generalDetails, "egfr"),
        this.fetchValue(this.patient.generalDetails, "ffm"),
      ]);
    }
    },
    validationFor(){
      let valid = true;
      if(this.patient.generalDetails.weight == undefined ||  this.patient.generalDetails.weight == "" || this.patient.generalDetails.weight == null || isNaN(this.patient.generalDetails.weight)){
        valid = false;
      }
      if(this.patient.generalDetails.height == undefined ||  this.patient.generalDetails.height == "" || this.patient.generalDetails.height == null || isNaN(this.patient.generalDetails.height)){
        valid = false;
      }
      if(this.patient.generalDetails.scr == undefined ||  this.patient.generalDetails.scr == "" || this.patient.generalDetails.scr == null || isNaN(this.patient.generalDetails.scr)){
        valid = false;
      }
      if(!moment(this.patient.generalDetails.birthday, "YYYY-MM-DD").isValid() || this.patient.generalDetails.birthday == undefined ||  this.patient.generalDetails.birthday == "" || this.patient.generalDetails.birthday == null){
        valid = false;
      }
      if(this.patient.generalDetails.gender == undefined ||  this.patient.generalDetails.gender == ""){
        valid = false;
      }
      return valid
    },
    calcBMI() {
      const weight = get(this.patient, "generalDetails.weight", 0);
      const height = get(this.patient, "generalDetails.height", 0) / 100;
      const bmi = (weight / height ** 2).toFixed(2);
      this.patient = {
        ...this.patient,
        generalDetails: { ...this.patient.generalDetails, bmi },
      };
    },
    async fetchValue(generalDetails, key) {
      try {
        const resp = await new Http({ auth: true }).post(
          `/patient/calculate${key.toUpperCase()}`,
          generalDetails
        );
        const path = key === "ffm" ? "data" : "data.data";
        const value = get(resp, path) || "";
        this.patient.generalDetails[key] =
          value == "" ? value : value.toFixed(2);
      } catch (e) {
        console.error(e);
      }
    },
    onRecommendDose() {
      this.isSaving = true;
      this.$refs.patientInformationTab.triggerValidate();
      this.patient.dosedetails.individualDose = null;
    },
    async validateAndRecommend(isValid) {
      if (isValid) {
        this.isSaving = true;
        try {
          const resp = await new Http({
            auth: true,
          }).post("/patient/updateDosingSchedule", {
            ...this.patient,
            drugName: this.drugName,
          });
          // if (resp.data.error) {
          //   // this.$store.commit("snackbar/setSnack", `${resp.data.reason}`);
          //   return;
          // }
          this.enableNavigation = true;
          const patient = get(resp, "data", {});
          Object.assign(this.patient, patient);
          this.isRecommended = true;
          if (this.activeTabIndex === 0) {
            Object.assign(this.defaultDoseDetails, this.patient.dosedetails);
          }
          this.setActiveTab(1);
          await this.fetchComputedValues();
          this.calcBMI();
        } catch (e) {
          console.error(e);
        } finally {
          this.isSaving = false;
          this.$nextTick(() => {
            this.enableNavigation = true;
          });
        }
      }
      this.isSaving = false;
    },
    printScreen() {
      html2canvas(document.body, {
        logging: false,
        ignoreElements: (el) => {
          return el.nodeName.toLowerCase() === "footer";
        },
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          const fileName = `${this.mrn}_${DateTime.local().toMillis()}.png`;
          saveAs(blob, fileName);
        });
      });
    },
    async onSave() {
      const api = `${this.newPatient ? "save" : "update"}`;
      const payload = {
        mrn: this.mrn,
        time: this.patient.time,
        treatmentId: this.treatmentId,
      };
      try {
        await new Http({ auth: true }).post(`/patient/${api}Schedule`, payload);
        // const notifyText = this.newPatient ? "added" : "updated";
        // this.$store.commit("snackbar/setSnack", `Patient ${notifyText}`);
        this.$router.push({ path: `/${this.conditionId}/treatments` });
      } catch (e) {
        console.error(e);
      }
    },
    async onLoadPatientSavedAt(time) {
      this.isLoading = true;
      try {
        const payload = {
          mrn: this.mrn,
          time,
        };
        const resp = await new Http({ auth: true }).post(
          "/patient/getTimelineEntry",
          payload
        );
        const patient = get(resp, "data", {});
        const patientTime = get(patient, "treatmentParameters.time", time);
        Object.assign(this.patient, patient, { time: patientTime });
        this.timelineActiveTime = patientTime;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    onReset() {
      if (this.activeTabIndex === 0) {
        this.getPatient(this.mrn);
      }
      if (this.activeTabIndex === 1) {
        Object.assign(this.patient.dosedetails, this.defaultDoseDetails);
        this.onRecommendDose();
      }
    },
  },
};
</script>
<style scoped>
.v-card__title{
  color:white !important;
}
</style>
