import Cookie from "js-cookie";
export const state = () => ({
  userData: "",
  error: {
    getUser: ""
  }
});

export const mutations = {
  setGetUserError(state, error) {
    state.error.getUser = error;
  },
  setGetUserSuccess(state, message) {
    state.success.getUser = message;
  },
  setUserData(state, user) {
    state.userData = user;
  }
};

export const actions = {
  getUser({ commit }, phone_number) {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    commit("setGetUserError", this.app.i18n.t(""));
    commit("setUserData", this.app.i18n.t(""));
    this.$axios
      .post("/user/getUser", { phone_number }, config)
      .then(response => {
        commit("setUserData", response.data.data);
      })
      .catch(err => {
        if (!err.response) {
          commit("setGetUserError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 404:
            commit("setGetUserError", this.app.i18n.t("errors.user404"));
            break;
          case 400:
            commit("setGetUserError", this.app.i18n.t("errors.user400"));
            break;
          default:
            commit("setGetUserError", this.app.i18n.t("errors.500"));
        }
      });
  },
  toggleBlock({ commit,dispatch }, phone_number) {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    this.$axios
      .patch("/controlPanel/toggleBlock", { phone_number }, config)
      .then(response => {
        commit("setUserData", response.data.data);
        dispatch("controlPanel/appointments/getUserAppointmentsData",response.data.data.user_id, {root: true});

      })
      .catch(err => {
        if (!err.response) {
          commit("setGetUserError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 404:
            commit("setGetUserError", this.app.i18n.t("errors.user404"));
            break;
          case 400:
            commit("setGetUserError", this.app.i18n.t("errors.user400"));
            break;
          default:
            commit("setGetUserError", this.app.i18n.t("errors.500"));
        }
      });
  }
};

export const getters = {
  getUserError(state) {
    return state.error.getUser;
  },
  getUserData(state) {
    return state.userData;
  }
};
