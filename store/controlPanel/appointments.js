import Cookie from "js-cookie";
export const state = () => ({
    userAppointments: {
        apps:"",
        error:"",
    },
    docAppointments: {
      apps:"",
      error:"",
  },
  newAppError:"",
});

export const mutations = {
setUserAppointments(state,appointments){
state.userAppointments.apps = appointments;
},
setUserAppointmentsError(state,message){
    state.userAppointments.error = message;
},
setDocAppointments(state,appointments){
  state.docAppointments.apps = appointments;
  },
  setDocAppointmentsError(state,message){
      state.docAppointments.error = message;
},
seNewAppError(state,message){
  state.newAppError = message;
}
};

export const actions = {
getUserAppointmentsData({commit},user_id){
  const token = Cookie.get("token");
  const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    commit("setUserAppointmentsError", "");
const userAppsData = this.$axios.post("/appointments/getUserApps",{user_id},config).then(response=>{
    commit("setUserAppointments",response.data.data);
    console.log(response.data.data);
}).catch(err => {
    if (!err.response) {
      commit("setUserAppointmentsError", this.app.i18n.t("errors.500"));
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
},

getDocAppointmentsData({commit},doctor_id){
  console.log(doctor_id);
  const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  commit("setDocAppointmentsError", "");
const userAppsData = this.$axios.post("/appointments/getDocApps",{doctor_id},config).then(response=>{
  commit("setDocAppointments",response.data.data);
}).catch(err => {
  if (!err.response) {
    commit("setDocAppointmentsError", this.app.i18n.t("errors.500"));
  }
  const status = err.response.status;
  switch (status) {
    case 400:
      commit("setDocAppointmentsError", this.app.i18n.t("errors.400"));
      break;
    default:
      commit("setDocAppointmentsError", this.app.i18n.t("errors.500"));
  }
});
},

cancelAppointment({dispatch,commit},{appointment_id,id,updateWhat}){
  const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
const canceled = this.$axios.patch("/appointments/cancelAppointment",{appointment_id},config).then(response=>{
  if (updateWhat == 'user'){  // to reload the users apps (from users panel)
    dispatch("getUserAppointmentsData",id);
  }else if (updateWhat == 'doctor'){ // to reload the doc apps (from docs panel)
    dispatch("getDocAppointmentsData",id);
  }

}).catch(err => {
  if (!err.response) {
    commit("setUserAppointmentsError", this.app.i18n.t("errors.500"));
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
},



addAppointment({commit,dispatch},{data,doctor_id}){
  const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  commit("seNewAppError","");
    const added = this.$axios.post("/appointments/addConfirmedAppointment",data,config).then(response=>{
      dispatch("getDocAppointmentsData",doctor_id);
      commit("controlPanel/users/setUserData","",{root:true});
    }).catch(err => {
      if (!err.response) {
        commit("seNewAppError", this.app.i18n.t("errors.500"));
      }
      const status = err.response.status;
      switch (status) {
        case 404:
          commit("seNewAppError", this.app.i18n.t("errors.user404"));
          break;
        case 400:
          commit("seNewAppError", this.app.i18n.t("errors.user400"));
          break;
        default:
          commit("seNewAppError", this.app.i18n.t("errors.500"));
      }
    });
},


};

export const getters = {
getUserAppointments(state){
    return state.userAppointments.apps; 
},
getUserAppointmentsError(state){
    return state.userAppointments.error; 
},
getDocAppointments(state){
  return state.docAppointments.apps; 
},
getDocAppointmentsError(state){
  return state.docAppointments.error; 
},
getNewAppError(state){
  return state.newAppError;
}
};
