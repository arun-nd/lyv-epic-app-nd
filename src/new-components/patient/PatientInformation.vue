<template>
  <v-form v-model="formValid">
    <v-layout wrap>
      <v-flex xs12 sm4 px-2 pb-1 v-for="(field, index) in fields" :key="index">
        <div v-if="!field.hide">
          <PatientAge
            v-if="field.label === 'Age'"
            :years="patientAge.years"
            :days="patientAge.days"
          />
          <component
            v-else-if="field.key === 'interval' || field.key === 'duration'"
            v-model="doseDetails[field.key]"
            :is="field.type"
            :append-text="field.unit"
            :label="field.label"
            :disabled="field.isReadonly"
            :required="field.isRequired"
            :field-key="field.key"
            :items="field.items"
            :validate="validate"
          />
          <component
            v-else
            v-model="patientDetails[field.key]"
            :is="field.type"
            :append-text="field.unit"
            :label="field.label"
            :disabled="field.isReadonly"
            :required="field.isRequired"
            :field-key="field.key"
            :items="field.items"
            :min="field.min"
            :max="field.max"
            :max-date="today"
            :validate="validate"
            :message="field.message"
            :error-message="field.errorMessage"
            @change="onChange($event, field)"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import Number from "@/new-components/ui/NumberInput";
import Dropdown from "@/new-components/ui/Dropdown";
import Date from "@/new-components/ui/Datepicker";
import PatientAge from "@/new-components/patient/PatientAge";
import patientAgeMixin from "@/mixins/patientAgeMixin";
import patientValidateMixin from "@/mixins/patientValidateMixin";
import { get, orderBy } from "lodash";
import { DateTime } from "luxon";

export default {
  name: "PatientInformation",

  mixins: [patientAgeMixin, patientValidateMixin],

  components: {
    Number,
    Dropdown,
    Date,
    PatientAge,
  },

  props: {
    schema: { type: Array, required: true },
    existingDoseDetails: { type: Object, required: true },
    existingPatientDetails: { type: Object, required: true },
  },

  data() {
    return {
      today: DateTime.local().toISODate(),
      formValid: false,
      patientDetails: this.existingPatientDetails,
      doseDetails: this.existingDoseDetails,
      fields: [],
      validate: false,
      remoteValidation: {
        done: 0,
        total: 0,
      },
    };
  },

  watch: {
    schema(value) {
      const fields = get(value, "1.fields", []);
      this.fields = orderBy(fields, ["order"], ["asc"]);
      this.updateField("pma", "hide", true);
    },
    existingPatientDetails(value) {
      this.patientDetails = value;
    },
    existingDoseDetails(value) {
      this.doseDetails = value;
    },
    patientDetails: {
      deep: true,
      handler(value) {
        this.calcAge(value.birthday);
        this.$emit("update:existingPatientDetails", value);
      },
    },
    doseDetails: {
      deep: true,
      handler(value) {
        this.$emit("update:existingDoseDetails", value);
      },
    },
    isNeonate: {
      immediate: true,
      handler(value) {
        this.updateField("pma", "hide", !value);
      },
    },
    validate() {
      const total = this.fields.filter((field) => field.remoteValidate).length;
      this.remoteValidation = {
        done: 0,
        total,
      };
    },
  },

  methods: {
    async onChange(value, field) {
      if (field.remoteValidate) {
        const payload = {
          field: field.validatorKey,
          value,
          params: {
            age: this.patientAge.years,
            gender: this.patientDetails.gender,
          },
        };
        const data = await this.remoteValidate(
          field.key,
          field.validateURL,
          payload
        );
        const status = get(data, "status", "ok");
        // const message = get(data, "message", "");
        if (status === "error") {
          this.updateField(field.key, "errorMessage", "");
          // this.updateField(field.key, "errorMessage", message);
          this.updateField(field.key, "message", "");
        } else {
          this.updateField(field.key, "errorMessage", "");
           this.updateField(field.key, "message", "");
          // this.updateField(field.key, "message", message);
        }
        this.remoteValidation.done++;
        if (this.remoteValidation.done === this.remoteValidation.total) {
          this.$emit("validated");
        }
      }
    },
  },
};
</script>
