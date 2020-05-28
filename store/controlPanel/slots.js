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
}
}

export const actions = {
getDoctorSlots({commit},doctor_id){
    commit("setDocSlotsError", "");
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
}
}

export const getters = {
getSlots(state){
    return state.doctorSlots;
},
getNewSlotError(state){
  return state.newSlotError;
}
}