<template>
  <v-layout wrap column>
    <v-flex text-right>
      <v-btn v-if="mutable" color="success" @click="addItem">Add Event</v-btn>
      <EventEntry
        v-if="showEventEntry"
        :general-details="generalDetails"
        :edit-event="editEvent"
        @close="onCloseEventEntry"
      />
    </v-flex>
    <v-data-table :headers="headers" :items="events">
      <template v-slot:item.event="{ item }">
        <v-icon small>
          {{ item.type === "Level" ? "assessment" : "colorize" }}
        </v-icon>
        {{ item.event || item.type }}
      </template>
      <template v-slot:item.time="{ item }">
        {{ item.time | formatDate }} <br />
        at {{ item.time | formatTime }}
      </template>
      <template v-slot:item.value="{ item }">
        <EventValue
          :type="item.type"
          :values="item.values"
          :mutable="mutable"
          @edit="onEditEvent(item)"
          @delete="onDeleteEvent(item)"
        />
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import EventEntry from "@/new-components/patient/EventEntry";
import EventValue from "@/new-components/patient/EventValue";
import { DateTime } from "luxon";
import { get, cloneDeep } from "lodash";

export default {
  name: "EventTable",

  components: { EventValue, EventEntry },

  props: {
    generalDetails: { type: Object, default: () => {} },
    existingEvents: { type: Array, required: true },
    mutable: { type: Boolean, default: true },
  },

  data() {
    return {
      events: this.existingEvents,
      editIndex: -1,
      editEvent: null,
      showEventEntry: false,
      headers: [
        {
          text: "Event",
          value: "event",
          align: "left",
          sortable: false,
        },
        {
          text: "Time",
          value: "time",
          align: "right",
          sortable: false,
        },
        {
          text: "Value",
          value: "value",
          align: "right",
          sortable: false,
        },
      ],
    };
  },

  computed: {
    timezone() {
      return get(this.$config, "date_time.events.text", "");
    },
  },

  watch: {
    existingEvents(value) {
      this.events = value;
    },
    events: {
      deep: true,
      handler(value) {
        this.$emit("update:existingEvents", value);
      },
    },
  },

  mounted() {
    this.headers[1].text = this.timezone;
  },

  methods: {
    toggleEdit() {
      this.showEventEntry = false;
      this.editIndex = -1;
      this.editEvent = null;
    },
    addItem() {
      this.toggleEdit();
      this.showEventEntry = true;
    },
    onCloseEventEntry(event) {
      if (event) {
        const dateTime = DateTime.fromISO(
          `${event.date}T${event.time}`
        ).toMillis();
        Object.assign(event, { time: dateTime });
        if (this.editIndex > -1) {
          this.events.splice(this.editIndex, 1, event);
        } else {
          this.events.push(event);
        }
      }
      this.events.sort(function compare(a, b) {
        var dateA = new Date(a.time);
        var dateB = new Date(b.time);
        return dateA - dateB;
      });
      this.toggleEdit();
    },
    onDeleteEvent(event) {
      const index = this.events.indexOf(event);
      if (confirm("Are you sure you want to delete this item?")) {
        this.events.splice(index, 1);
      }
    },
    onEditEvent(event) {
      this.toggleEdit();
      this.editIndex = this.events.indexOf(event);
      const dateTime = DateTime.fromMillis(event.time);
      this.editEvent = {
        ...cloneDeep(event),
        date: dateTime.toISODate(),
        time: dateTime.toLocaleString(DateTime.TIME_24_SIMPLE),
        timestamp: event.time,
      };
      this.showEventEntry = true;
    },
  },
};
</script>
