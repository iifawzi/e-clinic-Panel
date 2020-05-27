import Cookie from "js-cookie";
const token = Cookie.get("token");
const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

export const state = ()=>({
doctorSlots: "",
getDocSlotsError: ""
});

export const mutations = {
setSlots(state,slots){
    state.doctorSlots = slots;
},
setDocSlotsError(state,message){
    state.getDocSlotsError = message;
}
}

export const actions = {
getDoctorSlots({commit},doctor_id){
    commit("setDocSlotsError", "");
    this.$axios.post("/controlPanel/getDoctorSlots",{doctor_id},config).then(response=>{
        commit("setSlots", response.data.data);
    })    
    .catch(err => {
        console.log(err);
        if (!err.response) {
          commit("setDocSlotsError", this.app.i18n.t("errors.500"));
        }
        switch (status) {
          default:
            commit("setDocSlotsError", this.app.i18n.t("errors.500"));
        }
      });
}
}

export const getters = {
getSlots(state){
    return state.doctorSlots;
}
}