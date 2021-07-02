/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

import axios from "axios";
// import utils from "./utils";
// import router from '../router/index'
// import store from '../store/index'
const url =
  process.env.NODE_ENV === "production" ? process.env.VUE_APP_API_URL : process.env.VUE_APP_API_URL;

/**
 * Service helper class
 * @since 1.0.0
 */
export class Http {
  /**
   * extends a auth boolean param which will be passed on when invoking http helper class
   * @param {Object} status
   * @param {Boolean} status.auth
   */
  constructor(status) {
    this.is_auth = status && status.auth ? status.auth : false;
    /**
     * axios instance
     */
    this.instance = axios.create({
      /**
       * base URL from env
       */
      baseURL: url,
      /**
       * default headers
       */
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      /**
       * allocate timeout
       */
      // timeout: 20000,
    });
    
  }

  // init() {
  //   /**
  //    * request inperceptors **listners
  //    */
  //   // Request interceptor for API calls
  //   this.instance.interceptors.request.use(
  //     (request) => {
  //       if (this.is_auth) {
  //         /**
  //          * customise your headers here
  //          */
  //         request.headers.authorization = `Bearer ${utils.getLocalStoragevalue(
  //           "token"
  //         )}`;
  //         return request;
  //       } else {
  //         return request;
  //       }
  //     },(error) => {
  //       return Promise.reject(error.response);
  //     }
  //   );
  //   // Response interceptor for API calls
  //   this.instance.interceptors.response.use(
  //     (response) => {
  //      return response
  //     },(error) => {
  //       if (error.response.data.code == 401) {
  //         store.commit("snackbar/setSnack",error.response.data.message);
  //         store.commit("clearAuthData");
  //         localStorage.clear();
  //         // router.push({ path:'/auth/login' });
  //         return
  //       }else{
  //         store.commit("snackbar/setSnack","Please contact the administrator");
  //         return Promise.reject(error.response);
  //       }
       
  //     }
  //   );
  //   return this.instance;
  // }
}
