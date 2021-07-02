<template>
  <v-footer
    v-if="!(narrow)"
    class="button-toolbar"
    height="auto"
    fixed
  >
    <v-layout
      row
      v-resize="onResize"
    >
      <slot></slot>
    </v-layout>
  </v-footer>
  <v-speed-dial
    v-else
    v-model="fab"
    snall
    right
    v-resize="onResize"
    transition="none"
    bottom
    class="speed-dial"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="primary"
        dark
        fab
      >
        <v-icon v-if="fab">close</v-icon>
        <v-icon v-else>menu</v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'ActionButtonToolbar',
  data () {
    return {
      narrow: false,
      fab: false
    }
  },
  methods: {
    onResize () {
      this.narrow = window.innerWidth < 720
    }
  }
}
</script>

<style lang="scss">
.button-toolbar {
  // position: fixed;
  // z-index: 100;
  // top: 0;
  // margin: -15px 0 0 40%;
}
.v-messages__message {
  line-height: 1.2;
}
.speed-dial {
  width: 100%;
  position: fixed!important;
  pointer-events: none;

  .v-btn {
    pointer-events: initial;
  }

  >.v-btn {
    float: right;
  }
  >.v-speed-dial__list {
    align-items: flex-end;
    flex-direction: column;
  }
}
</style>
