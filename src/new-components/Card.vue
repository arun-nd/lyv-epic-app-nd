<template>
  <v-card class="mb-4">
    <v-card-title class="header">
      {{ title }}
      <v-icon
        v-if="toggable"
        class="ml-auto"
        size="35"
        color="white"
        @click="toggleShowCard"
      >
        mdi-arrow-down-drop-circle
      </v-icon>
    </v-card-title>
    <!-- <ProgressOverlay :loading="loading" v-show="showCard"> -->
      <v-card-text class="pt-2">
        <slot></slot>
      </v-card-text>
    <!-- </ProgressOverlay> -->
  </v-card>
</template>

<script>
import ProgressOverlay from "@/components/ProgressOverlay";

export default {
  name: "Card",

  components: {
    ProgressOverlay,
  },

  props: {
    title: { type: String, required: true },
    loading: { type: Boolean, default: false },
    toggable: { type: Boolean, default: false },
  },

  data() {
    return {
      showCard: true,
    };
  },

  methods: {
    toggleShowCard() {
      return (this.showCard = !this.showCard);
    },
  },
};
</script>

<style scoped>
.header {
  padding: 0.5rem;
  background-color: grey;
  color: white;
}
</style>
