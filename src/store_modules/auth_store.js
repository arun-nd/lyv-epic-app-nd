import { AuthService } from "../services/modules";

const state = {
  token: localStorage.getItem("token") || null,
  tokenExpires: localStorage.getItem("tokenExpires") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  refreshTokenExpires: localStorage.getItem("refreshTokenExpires") || null,
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  role: localStorage.getItem("role") || null,
  isConditionAccepted: localStorage.getItem("isConditionAccepted") || false,
  isChangePassword: localStorage.getItem("isChangePassword") || false,
};

const mutations = {
  authUser(state, userData) {
    state.token = userData.token;
    state.tokenExpires = userData.tokenExpires;
    state.refreshToken = userData.refreshToken;
    state.refreshTokenExpires = userData.refreshTokenExpires;
    state.name = userData.name;
    state.email = userData.email;
    state.role = userData.role;
    state.isConditionAccepted = userData.isConditionAccepted;
    state.isChangePassword = userData.isChangePassword;
  },

  clearAuthData(state) {
    state.token = null;
    state.refreshToken = null;
    state.tokenExpires = null;
    state.refreshToken = null;
    state.refreshTokenExpires = null;
    state.name = null;
    state.email = null;
    state.role = null;
    state.isConditionAccepted = false;
    state.isChangePassword = false;
  },

  agreed(state, data) {
    state.isConditionAccepted = data.agreedTermsCondition;
  },

  changePasswordForLogin(state, data) {
    state.isChangePassword = data.isChangePassword;
  },
};

const actions = {
  login: ({ commit }, authData) =>
    new Promise((resolve, reject) => {
      console.log(authData);
      AuthService.login({
        password: authData.password,
        email: authData.email,
      })
        .then((response) => {
          const { access } = response.data.tokens;
          const { refresh } = response.data.tokens;
          const { user } = response.data;
          commit("authUser", {
            token: access.token,
            tokenExpires: access.expires,
            refreshToken: refresh.token,
            refreshTokenExpires: refresh.expires,
            name: user.name,
            email: user.email,
            role: user.role,
            isConditionAccepted: user.isConditionAccepted,
            isChangePassword: user.isChangePassword,
          });
          resolve(response);
          console.log(access);
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    }),

  logout: ({ commit }) =>
    new Promise((resolve, reject) => {
      AuthService.logout({
        refreshToken: localStorage.getItem("refreshToken"),
      })
        .then((response) => {
          commit("clearAuthData");
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  forgotPass: ({ commit }, authData) =>
    new Promise((resolve, reject) => {
      console.log(authData);
      AuthService.forgotPass({
        email: authData.email,
      })
        .then((response) => {
          resolve(response);
          console.log(response);
          commit("");
        })
        .catch((error) => {
          reject(error);
        });
    }),

  // ------------------------------------------------------------------------------
  tryAutoLogin: ({ commit }, data) =>
    commit("authUser", {
      token: data.access_token,
      refreshToken: data.refresh_token,
    }),

  agreedTermsCondition: ({ commit }) => {
    commit("agreed", {
      agreedTermsCondition: true,
    });
  },

  changePasswordForLogin: ({ commit }) => {
    commit("changePasswordForLogin", {
      isChangePassword: true,
    });
  },
};

const getters = {
  userRole: (state) => state.role,
  userName: (state) => state.name,
  userEmail: (state) => state.email,

  loggedIn(state) {
    return state.token !== null;
  },

  agreementAccepted(state) {
    return state.isConditionAccepted;
  },

  changePassword(state) {
    console.log(typeof state.isChangePassword);
    return state.isChangePassword;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
