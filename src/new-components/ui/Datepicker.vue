<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :id="id"
        v-model="selectedDate"
        v-mask="compMask"
        :label="label"
        :error="isNotValid"
        :rules="dateRules"
        placeholder="YYYY-MM-DD"
        persistent-hint
        v-bind="attrs"
        v-on="on"
        prepend-icon="mdi-calendar"
        autocomplete="off"
      ></v-text-field>
    </template>
    <v-date-picker
      color="#EF515B"
       v-model="selectedDate"
      @change="setDate($event)"
      no-title
      :max="maxDate"
      :min="minDate"
      @input="menu1 = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import validateInputMixin from "@/mixins/validateInputMixin";
import dateUtils from "@/utils/dateUtils";
// import moment from "moment";
import { mask } from "vue-the-mask";
import config from "../../config/instance"

export default {
  name: "Datepicker",

  mixins: [validateInputMixin],
   directives: {
    mask,
  },

  props: {
    maxDate: { type: String },
    minDate: { type: String, default: "1950-01-01" },
     options: {
      type: Object,
      default: function() {
        return {
          format:config.date_time.patient_information.format,
          clearable: false,
          readonly: false,
          icon: "mdi-calendar",
          errorMessage: "Data Inválida",
        };
      },
    },
  },

  data() {
    return {
      menu1: false,
      selectedDate: null,
    };
  },
  methods:{ 
    replaceAll(str, find, replace) {
      console.log(str.replace(new RegExp(find, "g"), replace));
      return str.replace(new RegExp(find, "g"), replace);
    },
    setDate($event) {
     this.selectedDate = $event;
    }
  },
  computed: {
    formattedDate() {
      return dateUtils.isoToFormattedDate(this.selectedDate);
    },
    compMask: {
      get: function() {
        let format = this.options.format;
        format = this.replaceAll(format.toLowerCase(), "d", "#");
        format = this.replaceAll(format.toLowerCase(), "m", "#");
        format = this.replaceAll(format.toLowerCase(), "y", "#");
        return format;
      },
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.selectedDate = value;
      },
    },
    selectedDate(value) {
      this.$emit("input", value);
    },
  },
};
</script>
