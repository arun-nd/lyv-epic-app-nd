import { DateTime } from "luxon";

export default {
  props: {
    patientModel: { type: String, default: "" }
  },

  data() {
    return {
      patientAge: { years: null, days: null }
    };
  },

  computed: {
    isNeonateModel() {
      return this.patientModel.toLowerCase().includes("neonate");
    },
    ageLessThanAMonth() {
      return this.patientAge.years === 0 && this.patientAge.days <= 183;
    },
    isNeonate() {
      return this.ageLessThanAMonth;
    }
  },

  methods: {
    calcAge(date) {
      const birthdate = DateTime.fromISO(date);
      this.patientAge = DateTime.local().diff(birthdate, [
        "years",
        "days",
        "minutes"
      ]);
    }
  }
};
