<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" v-on="on" icon @click="toggleDialog">
          <v-icon>timeline</v-icon>
        </v-btn>
      </template>
      <span>
        {{ timelineText }}{{ patientTime | formatDate }} at
        {{ patientTime | formatTime }}
      </span>
    </v-tooltip>
    <v-dialog v-model="showDialog" width="550">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Timeline
        </v-card-title>
        <v-card-text>
          <v-timeline dense>
            <v-timeline-item
              v-for="item in timelineItems"
              :key="item.time"
              right
              :color="item.primary ? 'success' : 'secondary'"
              :small="!item.active"
            >
              <v-btn @click="onLoadPatientAt(item.time)" text>
                {{ item.time | formatDate }} at {{ item.time | formatTime }}
              </v-btn>
              <span class="px-2">
                <template v-if="item.active && item.primary">
                  (active, saved)
                </template>
                <template v-else-if="item.active"> (active) </template>
                <template v-else-if="item.primary"> (saved) </template>
              </span>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Http } from "@/services/service";
import { get } from "lodash";

export default {
  name: "PatientTimeline",

  props: {
    mrn: { type: String, required: true },
    patientTime: { type: Number, required: true },
  },

  data() {
    return {
      showDialog: false,
      timelineItems: [],
    };
  },

  computed: {
    timelineText() {
      const currentItem = this.timelineItems.find(
        (item) => item.time === this.patientTime
      );
      if (currentItem) {
        const text = currentItem.primary ? "Saved" : "Calculated";
        return `${text} schedule from `;
      }
      return "Patient Timeline from ";
    },
  },

  watch: {
    patientTime() {
      this.loadTimeline();
    },
  },

  mounted() {
    this.loadTimeline();
  },

  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    onLoadPatientAt(time) {
      this.toggleDialog();
      this.$emit("loadPatientSavedAt", time);
    },
    async loadTimeline() {
      try {
        const resp = await new Http({ auth: true }).post(
          "/patient/getTimeline",
          {
            mrn: this.mrn,
          }
        );
        const timeline = get(resp, "data.data", []);
        this.timelineItems = timeline.map((item) => ({
          time: item.time,
          active: item.time === this.patientTime,
          primary: item.saved,
        }));
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
