<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value="selectedTime"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :id="id"
        v-model="selectedTime"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      color="#EF515B"
      v-if="menu2"
      no-title
      v-model="selectedTime"
      full-width
      @click:minute="$refs.menu.save(selectedTime)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "Timepicker",

  props: {
    value: null,
  },

  data() {
    return {
      menu2: false,
      modal2: false,
      selectedTime: this.value,
    };
  },

  watch: {
    selectedTime(value) {
      this.$emit("input", value);
    },
  },
};
</script>
