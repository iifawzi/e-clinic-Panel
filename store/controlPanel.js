import Cookie from "js-cookie";
export const state = () => ({
  LoginedAdmin: "",
  error: {
    message: ""
  }
});

export const mutations = {
  login_admin(state, admin) {
    state.LoginedAdmin = admin;
  },
  setError(state, message) {
    state.error.message = message;
  },
};

export const actions = {
  login_admin({ commit }, adminData) {
    commit('setError','');
    const postSign = this.$axios
      .post("controlPanel/signAdmin", { ...adminData })
      .then(response => {
        const responseData = response.data.data;
        Cookie.set('token',responseData.token);
        this.$router.push("/controlPanel/dashboard");
      })
      .catch(err => {
        if (!err.response) {
          commit('setError',this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 401:
            commit('setError',this.app.i18n.t("errors.401"));
            break;
          case 400:
            commit('setError',this.app.i18n.t("errors.400"));
            break;
          default:
            commit('setError',this.app.i18n.t("errors.500"));
        }
      });
  },
   async authAdmin({ commit }, req) {
    // check token validation from the server : 
    const checkifvalid = async (token)=>{
      const postCheck = await this.$axios
      .post("controlPanel/checkAdminByToken",{token})
      .then(response=>{
        commit('login_admin',response.data.data);
        return true;
      }).catch(err=>{
        commit('login_admin','');
        return false;
      });
      const status = postCheck;
      return status;
    };



    if (req){
      if (!req.headers.cookie) {
        commit('login_admin','');
        return false;
      }
      const tokenCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("token"));
      if (!tokenCookie){
        commit('login_admin','');
        return false;
      }
      const token = tokenCookie.split("=")[1];
      const isValid = await checkifvalid(token);
      return isValid
    }else {
      const token = Cookie.get('token');
      if (!token){
        commit('login_admin','');
        return false;
      };
      const isValid = await checkifvalid(token);
      return isValid
    }
  },
  logout({commit}){
    commit('login_admin','');
    Cookie.remove('token');
  }
};

export const getters = {
  getAdmin(state) {
    return state.LoginedAdmin;
  },
  getError(state){
    return state.error.message;
  }
};
