<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import { get } from "lodash";

export default {
  name: "App",

  computed: {
    
    // isAuthRequired() {
    //   return this.$route.matched.some((route) =>
    //     get(route, "meta.requiresAuth", false)
    //   );
    // },
  },
};
</script>
