<template>
  <div>
    <v-layout row pa-2>
      <v-flex xs12 sm6 lg4 xl3 pr-4>
        <NumberInput
          :value="successMetrics.auc"
          label="AUC"
          append-text="mg hour/L"
          disabled
        />
      </v-flex>
      <v-flex xs12 sm6 lg4 xl3 pl-4>
        <NumberInput
          :value="successMetrics.ctrough"
          label="C<sub>trough</sub>"
          append-text="mg/L"
          disabled
        />
      </v-flex>
    </v-layout>
    <div class="title text-capitalize">{{ treatmentName }} PK Parameters</div>
    <v-layout row pa-2>
      <v-flex xs12 sm6 lg4 xl3 pr-4>
        <NumberInput :value="roundedVd" label="Vd" append-text="L" disabled />
      </v-flex>
      <v-flex xs12 sm6 lg4 xl3 pl-4>
        <NumberInput
          :value="roundedCl"
          label="Cl"
          append-text="L/hour"
          disabled
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import NumberInput from "@/new-components/ui/NumberInput";
import { Main } from "@/services/modules";
import { get } from "lodash";

export default {
  name: "PKParameters",

  components: { NumberInput },

  props: {
    successMetrics: { type: Object, required: true },
    pkParameters: { type: Object, required: true },
  },

  computed: {
    roundedCl() {
      return get(this.pkParameters, "cl", 0).toFixed(2);
    },
    roundedVd() {
      return get(this.pkParameters, "vd", 0).toFixed(2);
    },
  },

  data() {
    return {
      treatmentName: "",
    };
  },

  mounted() {
    const { treatment } = this.$route.params;
    this.getTreatment(treatment);
  },

  methods: {
    async getTreatment(treatment) {
      try {
        const resp = await Main.getTreatment(treatment);
        this.treatmentName = get(resp, "data.name", "");
      } catch (error) {
        this.setSnack({
          message: error.response.data.message,
          color: "error",
        });
        // this.$store.commit("snackbar/setSnack", {
        //   message: error.response.data.message,
        //   color: "error",
        // });
        if (error.response.data.code === 404) {
          this.$router.push({ name: "Login" });
        }
      }
    },
  },
};
</script>
