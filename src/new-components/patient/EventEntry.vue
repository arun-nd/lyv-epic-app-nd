<template>
  <v-form v-model="validEvent">
    <v-layout wrap>
      <v-flex px-2 x12 sm4>
        <Dropdown
        id="Dose Level"
          v-model="event.type"
          :items="['Dose', 'Level']"
          label="Type"
        />
      </v-flex>
      <v-flex px-2 x12 sm4>
        <Datepicker v-model="event.date" label="Date (YYYY-MM-DD)" :max-date="today" />
      </v-flex>
      <v-flex px-2 x12 sm4>
        <Timepicker v-model="event.time" label="At (HH:MM)" />
      </v-flex>
      <v-flex
        px-2
        x12
        sm6
        v-for="(field, index) in allFields[event.type]"
        :key="index"
      >
        <component
          :is="field.type"
          v-model="event.values[field.key]"
          :label="field.label"
          :appendText="field.unit"
          :items="field.items"
          :validate="validate"
          required
        />
      </v-flex>
      <!-- <v-col cols="3" offset-sm="9" class="py-0"> -->
        <v-flex x12 xs12>
        <v-btn class="mr-3" color="success" @click="onSave">Save</v-btn>
        <v-btn color="error" @click="$emit('close')" class="">Cancel</v-btn>
        </v-flex>
      <!-- </v-col> -->
    </v-layout>
  </v-form>
</template>

<script>
import Datepicker from "@/new-components/ui/Datepicker";
import Timepicker from "@/new-components/ui/Timepicker";
import Dropdown from "@/new-components/ui/Dropdown";
import Number from "@/new-components/ui/NumberInput";
import { DateTime } from "luxon";
import { get } from "lodash";

export default {
  name: "EventEntry",

  components: {
    Number,
    Dropdown,
    Datepicker,
    Timepicker,
  },

  props: {
    editEvent: { type: Object, default: null },
    generalDetails: { type: Object, default: null },
  },

  data() {
    return {
      validEvent: false,
      validate: false,
      today: DateTime.local().toISODate(),
      patientDetails: {},
      event: null,
      allFields: {
        Dose: [
          { type: "number", label: "Dose", unit: "mg", key: "dose" },
          {
            type: "dropdown",
            label: "Duration",
            unit: "mins",
            key: "duration",
            items: [30, 60, 90, 120, 180],
          },
        ],
        Level: [
          { type: "number", label: "Height", unit: "cms", key: "height" },
          { type: "number", label: "Weight", unit: "kgs", key: "weight" },
          { type: "number", label: "SCr", unit: "mg/dL", key: "scr" },
          {
            type: "number",
            label: "Measured Concentration",
            unit: "mg/L",
            key: "dv",
          },
        ],
      },
    };
  },

  computed: {
    height() {
      return get(this.generalDetails, "height", "");
    },
    weight() {
      return get(this.generalDetails, "weight", "");
    },
    scr() {
      return get(this.generalDetails, "scr", "");
    },
  },

  watch: {
    editEvent: {
      immediate: true,
      handler(value) {
        this.event = value || this.defaultItem();
      },
    },
  },

  methods: {
    onSave() {
      this.validate = true;
      if (this.validEvent) {
        this.$emit("close", this.event);
      }
    },
    defaultItem() {
      const dateTime = DateTime.local();
      return {
        values: {
          height: this.height,
          weight: this.weight,
          egfr: "",
          ffm: "",
          scr: this.scr,
          dv: "",
        },
        event: "",
        date: dateTime.toISODate(),
        time: dateTime.toLocaleString(DateTime.TIME_24_SIMPLE),
        type: "Level",
        isInsert: true,
        timestamp: "",
      };
    },
  },
};
</script>
