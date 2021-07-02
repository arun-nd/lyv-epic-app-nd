<template lang="html">
  <div class="progress-container">
    <v-progress-linear
      :class="loading ? 'progress' : 'progress noshow'"
      color="grey"
      indeterminate
    >
    </v-progress-linear>
    <slot></slot>
    <div class="overlay" v-show="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressOverlay',
  props: {
    loading: Boolean
  }
}
</script>

<style lang="scss" scoped>
.progress-container {
  position: relative;
}
.overlay {
  position: absolute;
  width: 100%;
  height: calc(100% - 7px);
  z-index: 3;
  background-color: white;
  top: 7px;
}

.progress {
  margin: 0;
}
.noshow {
  opacity: 0;
}
</style>
