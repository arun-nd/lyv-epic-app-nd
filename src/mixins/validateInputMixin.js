import { kebabCase } from "lodash";
import moment from "moment";

export default {
  props: {
    label: { type: String, default: "" },
    value: { default: null },
    rules: { type: Array, default: () => [value => !!value || "Required"] },
    date: { type: Array, default: () => [value => !!value || "Required", value => moment(value, "YYYY-MM-DD").isValid() || 'Enter a valid date', value => moment(value, "YYYY-MM-DD") < moment(new Date,"YYYY-MM-DD") || 'Enter a valid date']  },
    required: { type: Boolean, default: false },
    validate: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    message: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
  },

  watch: {
    validate(value) {
      if (value) {
        this.$emit('change', this.value)
      }
    }
  },

  computed: {
    id() {
      return `id-${kebabCase(this.label)}`;
    },
    applyRules() {
      return this.required ? this.rules : [];
    },
    dateRules(){
      return this.required ? this.date : [];
    },
    isNotValid() {
      return this.validate && this.required && !this.value;
    }
  }
};
