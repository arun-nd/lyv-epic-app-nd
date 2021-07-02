<template>
  <v-form v-model="formValid">
    <v-layout wrap>
      <v-flex px-2 x12 sm6 v-for="(field, index) in fields" :key="index">
        <component
          v-model="patientDetails[field.key]"
          :is="field.type"
          :label="field.label"
          :append-text="field.unit"
          :required="field.isRequired"
          :disabled="field.isReadonly"
          :validate="validate"
          :field-key="field.key"
          :rules="field.rules"
          :items="field.items"
          :loading="field.loading"
          :maxlength="field.maxlength"
          :error-message="field.errorMessage"
          @change="onChange($event, field)"
        />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import String from "@/new-components/ui/StringInput";
import Dropdown from "@/new-components/ui/Dropdown";
import patientValidateMixin from "@/mixins/patientValidateMixin";
import { get, orderBy } from "lodash";

export default {
  name: "PatientBasic",

  mixins: [patientValidateMixin],

  components: {
    String,
    Dropdown,
  },

  props: {
    schema: { type: Array, required: true },
    existingPatientDetails: { type: Object, required: true },
    newPatient: { type: Boolean, required: true },
  },

  data() {
    return {
      validate: false,
      formValid: false,
      patientDetails: {},
      fields: [],
    };
  },

  watch: {
    schema(value) {
      const fields = get(value, "0.fields", []);
      this.fields = orderBy(fields, ["order"], ["asc"]);
      this.updateField("mrn", "isReadonly", false);
    },
    existingPatientDetails: {
      immediate: true,
      handler(value) {
        this.patientDetails = value;
      },
    },
    patientDetails(value) {
      this.$emit("update:existingPatientDetails", value);
    },
    newPatient(value) {
      this.updateField("mrn", "isReadonly", !value);
    },
  },

  methods: {
    async onChange(value, field) {
      if (this.newPatient && field.remoteValidate && value) {
        const data = await this.remoteValidate(field.key, field.validateURL, {
          mrn: value,
          mode: "new",
        });
        const isExist = get(data, "isExist", false);
        const errorMessage = get(data, "message", "");
        this.updateField(
          field.key,
          "errorMessage",
          isExist ? errorMessage : ""
        );
      }
    },
  },
};
</script>
