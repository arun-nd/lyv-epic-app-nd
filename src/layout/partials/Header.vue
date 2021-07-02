<template>
  <div data-app>
    <v-app-bar light>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="'/conditions/'">
        <v-img
          class="mx-2"
          src="@/assets/pumas-brand-header.svg"
          max-height="100"
          max-width="100"
          contain
        ></v-img>
      </router-link>

      <v-toolbar-title> Lyv<sup>®</sup> CDS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="routeTo('Condition')" id="home" name="home">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" id="dots" name="dots">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item>
            <v-list-item-title @click="routeTo('Profile')" class="cp"
              >Profile</v-list-item-title
            >
          </v-list-item> -->
        
          <!-- <v-list-item>
            <v-list-item-title>User Profile</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>
   
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app-header",
  computed: {
    ...mapGetters(["userRole"]),
 
  }
}


</script>

<style type="text/css">
.deep-purple--text {
  color: #ef515b !important;
  caret-color: #ef515b !important;
}
.cp {
  cursor: pointer !important;
}
.subtitlestyle{
  text-transform: none;
}
</style>
