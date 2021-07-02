import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
// import './plugins/vuetify'
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./styles/global.scss";
// import store from "./store/index";
import "babel-polyfill";
// import IdleVue from "idle-vue";
import dateUtils from "@/utils/dateUtils";
import config from "@/config/instance.json"
// Vue.use(require('vue-moment'));

// const eventsEmitter = new Vue();

Vue.use({
  // eventsEmitter,
  // store,
  // idleTime: 5 * 60 * 1000,
  // startAtIdle: false,
});

Vue.config.productionTip = false;

Vue.filter("formatDate", (value) => dateUtils.millisToFormattedDate(value));
Vue.filter("formatTime", (value) => dateUtils.millisToFormattedTime(value));
Vue.filter("formatDob", (value) => dateUtils.dobToFormatted(value));
Vue.use(vuetify);
Vue.prototype.$config = config;

new Vue({
  router,
  vuetify,
  // store,
  render: (h) => h(App),
}).$mount("#app");
