import Vue from 'vue';
import Vuex from 'vuex';
import auth_store_module from '../store_modules/auth_store';
import snackbar from '../store_modules/snackbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth_store_module,
    snackbar
  }
})