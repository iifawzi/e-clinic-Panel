import Cookie from "js-cookie";
const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

export const state = () => ({
    userAppointments: {
        apps:"",
        error:"",
    },
});

export const mutations = {
setUserAppointments(state,appointments){
state.userAppointments.apps = appointments;
},
setUserAppointmentsError(state,message){
    state.userAppointments.error = message;
    }
};

export const actions = {
getUserAppointmentsData({commit},user_id){
    commit("setUserAppointmentsError", "");
const userAppsData = this.$axios.post("/appointments/getUserApps",{user_id},config).then(response=>{
    commit("setUserAppointments",response.data.data);
}).catch(err => {
    if (!err.response) {
      commit("setError", this.app.i18n.t("errors.500"));
    }
    const status = err.response.status;
    switch (status) {
      case 400:
        commit("setUserAppointmentsError", this.app.i18n.t("errors.400"));
        break;
      default:
        commit("setUserAppointmentsError", this.app.i18n.t("errors.500"));
    }
  });
}
};

export const getters = {
getUserAppointments(state){
    return state.userAppointments.apps; 
},
getUserAppointmentsError(state){
    return state.userAppointments.error; 
}
};
