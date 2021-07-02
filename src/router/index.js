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
    redirect: "/launch?drugname=melphalan&iss=https%3A%2F%2Fehr%2Ffhir&launch=xyz123",
    component: layout,
  },
  {
    path: "/launch?drugname=melphalan&iss=https%3A%2F%2Fehr%2Ffhir&launch=xyz123",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "NewPatient",
        component: () => import("@/new-components/pages/PatientDetail"),
      },
      // {
      //   path: "",
      //   name: "Profile",
      //   component: () => import("@/pages/profile-page/Profile"),
      // },
    ],
  },
  {
    path: "/:condition/treatments",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "Treatment",
        component: () => import("@/pages/patient/index"),
      },
    ],
  },
  {
    path: "/:condition/treatments/:treatment/patientList",
    component: layout,
    meta: {
      requiresAuth: true,
      requiresAgreement: true,
    },
    children: [
      {
        path: "",
        name: "PatientList",
        component: () => import("@/pages/patient/index"),
      },
    ],
  },
  // {
  //   path: "/:condition/treatments/:treatment/newPatient",
  //   component: layout,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAgreement: true,
  //   },
  //   children: [
  //     {
  //       path: "",
  //       name: "NewPatient",
  //       component: () => import("@/new-components/pages/PatientDetail"),
  //     },
  //   ],
  // },
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
