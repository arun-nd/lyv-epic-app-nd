import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import layout from "../layout";
import PageNotFound from "@/pages/PageNotFound";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/epic/launch/newPatient",
    component: layout,
  },
  {
    path: "/epic/launch/newPatient",
    component: layout,
    meta: {
      requiresAuth: false,
      requiresAgreement: false,
    },
    children: [
      {
        path: "",
        name: "NewPatient",
        component: () => import("@/new-components/pages/PatientDetail"),
      },
    ],
  },
  {
    path: "/:condition/treatments/:treatment/patientStatus/:mrn",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "EditPatient",
        component: () => import("@/new-components/pages/PatientDetail"),
      },
    ],
  },

  
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
