import Cookie from "js-cookie";
export const state = () => ({
  error: {
    message: "",
    deleteDoctor: ""
  },
  success: {
    message: "",
    deleteDoctor: ""
  },
  doctor: "",
  doctors: "",
  accountStatus: 1, // i'm using this to update the button of `active user / deactivae user, <RERENDER THE FORM>`
});

export const mutations = {
  setError(state, message) {
    state.error.message = message;
  },
  setSuccess(state, message) {
    state.success.message = message;
  },
  setDoctor(state, docData) {
    state.doctor = docData;
  },
  accountStatus(state) {
    state.accountStatus = state.accountStatus+1;
  },
  setDoctors(state,doctors){
    state.doctors =  doctors 
  },
  setDeleteDoctorError(state,error){
    state.error.deleteDoctor =  error 
  },
  setDeleteDoctorSuccess(state,error){
    state.success.deleteDoctor =  error 
  },
};

export const actions = {
  // Upload Image:
  async uploadImage({ commit }, { picture, config }) {
    const formData = new FormData();
    formData.append("file", picture);
    let uploadImage = await this.$axios
      .post("/controlPanel/addImage", formData, config)
      .then(response => {
        const responseData = response.data.data;
        return responseData.filename;
      })
      .catch(err => {
        if (!err.response) {
          commit("setError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 403:
            commit("setError", this.app.i18n.t("errors.image403"));
            break;
          case 500:
            commit("setError", this.app.i18n.t("errors.image500"));
            break;
          default:
            commit("setError", this.app.i18n.t("errors.500"));
        }
      });
    return uploadImage;
  },



  // add doctor /controlPanel/dashboard/doctors/add
  async add_doctor({ commit, dispatch }, doctorData) {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    commit("setError", "");
    commit("setSuccess", "");
    const imagename = await dispatch("uploadImage", {
      picture: doctorData.picture,
      config: config
    });
    if (imagename) {
      const doctorDataWithPicture = { ...doctorData };
      delete doctorDataWithPicture.picture;
      doctorDataWithPicture.picture = imagename;
      const addDoctor = this.$axios
        .post("/controlPanel/addDoctor", { ...doctorDataWithPicture }, config)
        .then(response => {
          const responseData = response.data.data;
          commit("setSuccess", this.app.i18n.t("success.add"));
        this.$router.push("/controlPanel/dashboard/doctors/all/"+responseData.doctor_id);

        })
        .catch(err => {
          if (!err.response) {
            commit("setError", this.app.i18n.t("errors.500"));
          }
          const status = err.response.status;
          switch (status) {
            case 403:
              commit("setError", this.app.i18n.t("errors.403"));
              break;
            case 400:
              commit("setError", this.app.i18n.t("errors.400"));
              break;
            default:
              commit("setError", this.app.i18n.t("errors.500"));
          }
        });
    }
  },



  // get specific doctor /controlPanel/dashboard/doctors/PHONE_NUMBER
  async get_doctor({ commit }, doctor_id) {
    commit("setError", "");
    if (this.getters.getSuccess != ''){
      setTimeout(() => {
    commit("setSuccess", "");
      }, 2000);
    }
    // commit("setDoctor", "");
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const doctorData = this.$axios
      .post("/doctors/getDoctor", { doctor_id }, config)
      .then(response => {
        commit("setDoctor", response.data.data);
      })
      .catch(err => {
        this.$router.push("/controlPanel/dashboard/doctors/all");
      });
  },



  // update data of specific doctor:
  async update_doctor({commit,dispatch},{doctor_id,Newdata}) {
    commit("setError", "");
    commit("setSuccess", "");
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    if (Newdata.picture != undefined){
      // if we will upload a picture: 
      const imagename = await dispatch("uploadImage", {
        picture: Newdata.picture,
        config: config
      });
      if (imagename){
        delete Newdata.picture;
        const updatedDoctor = this.$axios.patch("/doctors/updateDoctor",{doctor_id,...Newdata,picture: imagename},config).then(response=>{
          commit("accountStatus");
          commit("setSuccess", this.app.i18n.t("success.edit"));
  
        })
        .catch(err => {
          if (!err.response) {
            commit("setError", this.app.i18n.t("errors.500"));
          }
          const status = err.response.status;
          switch (status) {
            case 403:
              commit("setError", this.app.i18n.t("errors.403"));
              break;
            case 400:
              commit("setError", this.app.i18n.t("errors.400"));
              break;
            default:
              commit("setError", this.app.i18n.t("errors.500"));
          }
        });
      }
    }else {
      // if we will not upload a picture: 
      const updatedDoctor = this.$axios.patch("/doctors/updateDoctor",{doctor_id,...Newdata},config).then(response=>{
        commit("accountStatus");
        commit("setSuccess", this.app.i18n.t("success.edit"));

      })
      .catch(err => {
        if (!err.response) {
          commit("setError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 403:
            commit("setError", this.app.i18n.t("errors.403"));
            break;
          case 400:
            commit("setError", this.app.i18n.t("errors.400"));
            break;
          default:
            commit("setError", this.app.i18n.t("errors.500"));
        }
      });
    }
  },


// Get Doctors Data: 
  async getDoctors({commit}){
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const doctors =  this.$axios.get("/controlPanel/getDoctors",config).then(response=>{
      commit("setDoctors",response.data.data);
    }).catch(err=>{
      commit("setError", this.app.i18n.t("errors.500"));
    })
  },

// Delete Doctor:  

async deleteDoctor({commit},phone_number){
  commit("setDeleteDoctorSuccess",this.app.i18n.t(""));
  const token = Cookie.get("token");
  const deleteDoctor =  this.$axios.delete("/controlPanel/deleteDoctor",{
    headers:{
       Authorization: "Bearer " + token
      },
      data:{
        phone_number: phone_number
      }
    }).then(response=>{
    commit("setDeleteDoctorSuccess",this.app.i18n.t("dashboard.forms.allDoctors.delete"));
  }).catch(err=>{
    commit("setDeleteDoctorError", this.app.i18n.t("errors.500"));
  })
}

};





export const getters = {
  getError(state) {
    return state.error.message;
  },
  getSuccess(state) {
    return state.success.message;
  },
  getDoctor(state) {
    return state.doctor;
  },
  getDoctors(state) {
    return state.doctors;
  },
  accountStatus(state) {
    return state.accountStatus;
  },
  getDeleteError(state) {
    return state.error.deleteDoctor;
  },
  getDeleteSuccess(state) {
    return state.success.deleteDoctor;
  }
};
