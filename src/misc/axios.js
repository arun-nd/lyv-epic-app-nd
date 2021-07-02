import ax from 'axios'
import utils from '../services/utils'
// import router from '../router/index'
// import store from '../store/index'

let url = process.env.NODE_ENV === 'production' ? '/app' : process.env.VUE_APP_API_URL+'/patient'

const axios = ax.create({
  baseURL: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'authorization':`Bearer ${utils.getLocalStoragevalue('token')}`
  }
})
// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
   return response
   },
  //  (error) => {
    //  store.commit("snackbar/setSnack", {
    //   message: error.response.data.message,
    //   color: "error",
    // });
    // store.commit("snackbar/setSnack",error.response.data.message);
    // if (error.response.data.code == 404) {
    //       localStorage.clear();
    //   router.push({ path:'/login' });
    // }
    // return Promise.reject(error.response);
  // }
);

export default axios


