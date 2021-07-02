import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./styles/global.scss";
import "babel-polyfill";
import dateUtils from "@/utils/dateUtils";

// const eventsEmitter = new Vue();

Vue.use({
  // eventsEmitter,
  // store,
});

Vue.config.productionTip = false;
Vue.filter("formatDate", (value) => dateUtils.millisToFormattedDate(value));
Vue.filter("formatTime", (value) => dateUtils.millisToFormattedTime(value));
Vue.use(vuetify);

new Vue({
  // router,
  vuetify,
  // store,
  render: (h) => h(App),
}).$mount("#app");
