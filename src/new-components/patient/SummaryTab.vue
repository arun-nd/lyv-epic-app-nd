<template>
  <v-layout row>
    <v-flex x12 lg6 md12 px-4>
      <Card title="Graph" :loading="loading">
        <TimelineGraph visible :data="graphData" />
      </Card>
    </v-flex>
    <v-flex x12 lg6 md12 px-4>
      <Card title="Summary" :loading="loading">
        <EventTable :existing-events="events" :mutable="false" />
      </Card>
    </v-flex>
  </v-layout>
</template>

<script>
import Card from "@/new-components/ui/Card";
import EventTable from "@/new-components/patient/EventTable";
import TimelineGraph from "@/components/TimelineGraph";

export default {
  name: "SummaryTab",

  components: { TimelineGraph, EventTable, Card },

  props: {
    loading: { type: Boolean, required: true },
    events: { type: Array, required: true },
    graphData: { type: Array, required: true },
  },
};
</script>
