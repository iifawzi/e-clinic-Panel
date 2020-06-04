import Cookie from "js-cookie";
const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

export const state = ()=>({
doctorSlots: "",
DocSlotsError: "",
newSlotError: "",
editSlotError: "",
editSlotSuccess: "",
openSlots: "",
});

export const mutations = {
setSlots(state,slots){
    state.doctorSlots = slots;
},
setDocSlotsError(state,message){
    state.DocSlotsError = message;
},
setNewSlotError(state,message){
  state.newSlotError = message;
},
setEditSlotError(state,message){
  state.editSlotError = message;
},
setEditSlotSuccess(state,message){
  state.editSlotSuccess = message;
},
setOpenSlots(state,slots){
  state.openSlots = slots;
}
}

export const actions = {
getDoctorSlots({commit},doctor_id){
    commit("setDocSlotsError", "");
    commit("setSlots", "");
    this.$axios.post("/controlPanel/getDoctorSlots",{doctor_id},config).then(response=>{
        commit("setSlots", response.data.data);
    })    
    .catch(err => {
        if (!err.response) {
          commit("setDocSlotsError", this.app.i18n.t("errors.500"));
        }
            commit("setDocSlotsError", this.app.i18n.t("errors.500"));
      });
},


addNewSlot({commit,dispatch},data){
  commit("setNewSlotError", "");
  this.$axios.post("/slots/addSlot",{...data},config).then(response=>{
    dispatch("getDoctorSlots",data.doctor_id);
  })    
  .catch(err => {
    if (!err.response) {
      commit("setNewSlotError", this.app.i18n.t("errors.500"));
    }
    const status = err.response.status;
    switch (status) {
      case 400:
        commit("setNewSlotError", this.app.i18n.t("errors.400"));
        break;
      default:
        commit("setNewSlotError", this.app.i18n.t("errors.500"));
    }
  });
},


updateSlot({commit,dispatch},{newData,doctor_id}){
  commit("setEditSlotError", "");
  this.$axios.patch("/slots/updateSlot",{...newData},config).then(response=>{
    dispatch("getDoctorSlots",doctor_id);
    commit("setEditSlotSuccess", this.app.i18n.t("success.edit"));
    setTimeout(() => {
    commit("setEditSlotSuccess", "");
    }, 3000);
  })    
  .catch(err => {
    if (!err.response) {
      commit("setEditSlotError", this.app.i18n.t("errors.500"));
    }
    const status = err.response.status;
    switch (status) {
      case 400:
        commit("setEditSlotError", this.app.i18n.t("errors.400"));
        break;
      default:
        commit("setEditSlotError", this.app.i18n.t("errors.500"));
    }
  });
},

getOpenSlots({commit},data){
  this.$axios.post("/slots/getOpenSlots",data,config).then(response=>{
    commit("setOpenSlots", response.data.data);
  })
  .catch(err => {
  });
}
}




export const getters = {
getSlots(state){
    return state.doctorSlots;
},
getNewSlotError(state){
  return state.newSlotError;
},
getEditSlotError(state){
  return state.editSlotError;
},
getEditSlotSuccess(state){
  return state.editSlotSuccess;
},
getOpenSlots(state,slots){
  return state.openSlots;
}
}