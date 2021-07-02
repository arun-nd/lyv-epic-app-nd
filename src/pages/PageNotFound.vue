<template>
  <div
    class="d-flex flex-column justify-center align-center"
    style="height: 100%"
  >
    <div>
      <v-img src="../assets/404.jpg" width="300" height="300" />
    </div>
    <h1>404</h1>
    <h4>Page Not Found</h4>
    <v-btn color="#EF515B" outlined text @click="onBack">Back</v-btn>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",

  methods: {
    onBack() {
      window.history.back();
    },
  },
};
</script>