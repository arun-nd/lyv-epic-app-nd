<template>
  <v-container>
    <div>
      <v-alert text close-text="Close Alert" color="#3244a8" dark dismissible
        ><b>
         {{note}}
        </b>
      </v-alert>
      <v-alert
        v-if="studyId"
        text
        close-text="Close Alert"
        color="#3244a8"
        dark
        dismissible
        ><b> </b>
        <h4>{{ envStudyId }}</h4>
        <h4>{{ envStudyTitle }}</h4>
      </v-alert>
    </div>
    <!-- <v-snackbar
      :color="ui.infoSnackbar.color"
      :timeout="ui.infoSnackbar.timeout || 6000"
      v-model="ui.infoSnackbar.state"
    >
      {{ ui.infoSnackbar.info }}
      <v-icon @click="ui.infoSnackbar.state = false" dark>close</v-icon>
    </v-snackbar> -->

    <v-row>
      <v-col>
        <v-card>
          <v-card-actions>
            <v-card-title class="v-card__title-dashboard"> {{conditionName}} </v-card-title>
            <v-spacer></v-spacer>

            <v-btn
              id="add patient"
              name="add patient"
              :to="`/${condition}/treatments/${treatment}/newPatient`"
              color="#EF515B"
              outlined
              right
              text
            >
              Add Patient
            </v-btn>
          </v-card-actions>
          <v-tabs color="#EF515B" v-model="activeTab">
            <v-tab
              dark
              left
              v-for="treatments in treatmentData"
              :key="treatments.creMent"
              @click="routeTo(treatments)"
            >
              {{ treatments.route }}
            </v-tab>
            <v-tab-item
              :key="'key' + treatments.id"
              v-for="treatments in treatmentData"
            >
              <v-card text>
                <v-card-title>
                  <v-text-field
                    id="search"
                    name="search"
                    append-icon="mdi-magnify"
                    hide-details
                    label="Search"
                    single-line
                    v-model="search"
                  ></v-text-field>
                </v-card-title>

                <v-data-table
                  :headers="headers"
                  :items="patients"
                  :search="search"
                  :loading="loading"
                  loading-text="Loading... Please wait"
                  class="elevation-1"
                  @click:row="handleClick"
                >
                  <template v-slot:item.DOB="{ item }">
                    {{ formatDate(item.DOB) }}
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showResult" :timeout="2000" top>
      {{ result }}
    </v-snackbar>
  </v-container>
</template>

<script>
// import moment from "moment";
import { Main } from "../../services/modules";
import config from "../../config/instance"

export default {
  name: "dasboard",
  data() {
    return {
      note:config.note.content,
      envStudyId: "",
      envStudyTitle: "",
      studyId: false,
      loading: false,
      selection: 1,
      search: "",
      activeTab: 0,
      conditionName:'',
      ui: {
        retrieveLoading: false,
        infoSnackbar: {
          state: false,
          color: "error",
          info: null,
          timeout: 6000,
        },
      },
      patients: [],
      treatment: null,
      treatmentData: [],
      condition: null,
      error: false,
      showResult: false,
      result: "",
      headers: [
        // { text: 'ID', value: '_id' },
        {
          text: "MRN",
          value: "MRN",
        },
        /* {
          text: "Date of birth",
          value: "DOB",
        },*/
        {
          text: "Age",
          value: "YearsDays",
        },
        {
          text: "SCR",
          value: "scr",
        },
        // {
        //   text: "Gender",
        //   value: "Gender",
        // },

        // { text: 'Actions', value: 'actions', sortable: false, hidden: true },
      ],
    };
  },
  mounted() {
    const { condition, treatment } = this.$route.params;
    this.condition = condition;
    this.treatment = treatment;
    this.getCondition(condition)
    this.getAllTreatment(condition);
    this.getStudyID();
  },
  //============================
  /*computed: {
   age(birthday) {
      return (
        (new Date() - new Date(birthday) )/
        (1000 * 60 * 60 * 24)
      );
    },
    ageYears(birthday){
      alert("iam in error",birthday);
      if (this.age(birthday) && !isNaN(this.age(birthday))) {
        return Math.trunc(this.age(birthday)  / 365);
      } else {
        return "";
      }
    },
    ageDays(birthday) {
      if (this.age(birthday) && !isNaN(this.age(birthday) )) {
        return Math.trunc(this.age(birthday)  % 365);
      } else {
        return "";
      }
    },
    ageMonths() {
      if (this.age()  && !isNaN(this.age() )) {
        return Math.trunc(this.age / 29.5);
      } else {
        return "";
      }
    },
    
    
  },*/

  //======================
  methods: {
    getYearsDays: function (birthday) {
      return (
        this.ageYears(birthday) + " Years " + this.ageDays(birthday) + " Days"
      );
    },
    age: function (birthday) {
      return (new Date() - new Date(birthday)) / (1000 * 60 * 60 * 24);
    },
    ageYears: function (birthday) {
      // console.log(birthday);
      // alert(birthday);
      if (this.age(birthday) && !isNaN(this.age(birthday))) {
        return Math.trunc(this.age(birthday) / 365);
      } else {
        return "";
      }
    },
    ageDays: function (birthday) {
      if (this.age(birthday) && !isNaN(this.age(birthday))) {
        return Math.trunc(this.age(birthday) % 365);
      } else {
        return "";
      }
    },
    setTabActive(treatment) {
      this.activeTab = treatment;
      console.log(this.activeTab);
    },
    routeTo(route) {
      this.treatment = route.id;
      this.$router.push({
        path: `/${this.condition}/treatments/${route.id}/patientList`,
      });
      this.getAllPatient(route.id);
    },
    getAllPatient(params) {
      this.loading = true;
      Main.getAllPatient(params)
        .then((response) => {
          this.patients = [];
          let patientsData = response.data.data;
          for (let index = 0; index < patientsData.length; index++) {
             const e = patientsData[index];
            let birthdayAge = e.birthday;
            let yearsAge = this.getYearsDays(birthdayAge);
            this.patients.push({
              MRN: e.mrn,
              DOB: birthdayAge,
              YearsDays: yearsAge,
              scr: e.scr,
            });
          }
          this.loading = false;
        })
        .catch(() => {});
    },
    getCondition(params){
       Main.getCondition(params)
        .then((response) => {
         this.conditionName = response.data.data.name + ' module'
        })
        .catch(() => {});
    },
    getAllTreatment(params) {
      let vm = this;
      Main.getAllTreatment(params)
        .then((response) => {
          this.treatmentData = [];
          let treatmentList = response.data.data;
          let i = 0;
          for (let treatment in treatmentList) {
            console.log(treatmentList[treatment]);
            this.treatmentData.push({
              id: treatmentList[treatment]._id,
              route: treatmentList[treatment].name,
              creMent: i++,
            });
          }
          console.log(this.treatmentData);
          if (this.treatmentData.length > 0) {
            if (this.treatment == undefined) {
              this.routeTo(this.treatmentData[0]);
            } else {
              this.getAllPatient(this.treatment);
              let index = this.treatmentData.findIndex(
                (x) => x.id === this.treatment
              );
              this.setTabActive(index);
            }
            return;
          }
          vm.error = true;
          vm.result = "No treatment available";
          vm.showResult = true;
        })
        .catch(() => {
          // if(error){
          //    vm.error = true;
          //    vm.result = "Something went wrong!";
          //    vm.showResult = true;
          // }
        });
    },
    handleClick(value) {
      let path = `/${this.condition}/treatments/${this.treatment}/patientStatus/${value.MRN}`;
      this.$router.push({ path });
    },
    getStudyID() {
      this.envStudyId = process.env.VUE_APP_STUDY_ID;
      this.envStudyTitle = process.env.VUE_APP_STUDY_TITLE;
      console.log(this.envStudyId);
      if (this.envStudyId == "") {
        this.studyId = false;
      } else {
        this.studyId = true;
      }
    },
  },
};
</script>
<style>
.v-tab--active {
  background-color: #ef515b !important;
  color: white !important;
}
.v-tabs-bar {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
tr {
  cursor: pointer !important;
}
.blue--text {
  color: #085391 !important;
}
.v-card__title-dashboard{
  color: #6DA2D4 !important;
  font-size:1rem !important;
  font-weight: bold !important;
  text-transform: capitalize;
}
/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {
  /* .v-tab{
  width: 200px !important;
} */
}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {
  /* .v-tab{
  width: 200px !important;
} */
}
.alert__content {
  color: black;
}
</style>
