export const state = () => ({
  LoginedAdmin: "",
  error: {
    message: ""
  }
});

export const mutations = {
  login_admin(state, user) {
    state.LoginedUser = user;
  },
  setError(state, message) {
    state.error.message = message;
  }
};

export const actions = {
  login_admin({ commit }, adminData) {
    commit('setError','');
    const postSign = this.$axios
      .post("controlPanel/signAdmin", { ...adminData })
      .then(response => {
        commit("login_admin", response.data.data);
        this.$router.push("controlPanel/dashboard");
      })
      .catch(err => {
        if (!err.response) {
          commit('setError',$t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 401:
            commit('setError',this.app.i18n.t("errors.401"));
            break;
          case 400:
            commit('setError',this.app.i18n.t("errors.401"));

            break;
          default:
            commit('setError',this.app.i18n.t("errors.401"));
        }
      });
  },
  authAdmin({ commit }, req) {
    if (!req.headers.cookie) {
      return;
    }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.LoginedAdmin.token != null;
  },
  getAdmin(state) {
    return state.LoginedAdmin;
  },
  getError(state){
    return state.error.message;
  }
};
