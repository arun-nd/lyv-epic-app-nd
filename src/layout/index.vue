<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <!-- <b-overlay spinner-type="grow" spinner-variant="inverse-primary" :show="loader" rounded="sm" class="container-fluid page-body-wrapper"> -->
      <!-- <SettingsPannel></SettingsPannel>
        <Sidebar /> -->
      <div class="main-panel">
        <div class="content-wrapper background">
          <router-view></router-view>
        </div>
        <!-- content wrapper ends -->
        <Footer />
      </div>
      <!-- main panel ends -->
      <!-- </b-overlay> -->
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
import Header from "./partials/Header";
// import Sidebar from "./partials/Sidebar";
import Footer from "./partials/Footer";
// import SettingsPannel from "./partials/SettingsPannel";
// import { mapGetters } from "vuex";
export default {
  name: "layout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.background {
  min-height: 90vh;
}
.main-view{
   min-height: 100vh; /* will cover the 100% of viewport */
 overflow: hidden;
 display: block;
 position: relative;
 padding-bottom: 100px; /* height of your footer */

}
</style>
