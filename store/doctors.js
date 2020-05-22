export const state = () => ({
  error: {
    message: ""
  },
  success: {
    message: ""
  }
});

export const mutations = {
  setError(state, message) {
    state.error.message = message;
  },
  setSuccess(state, message) {
    state.success.message = message;
  }
};

export const actions = {
  async uploadImage({ commit }, picture) {
    console.log(picture);
    const formData = new FormData();
    formData.append("file", picture);
    let uploadImage = await this.$axios
      .post("/controlPanel/addImage", formData)
      .then(response => {
        const responseData = response.data.data;
        return responseData.filename;
      })
      .catch(err => {
        console.log(err);
        if (!err.response) {
          commit('setError',this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 403:
            commit('setError',this.app.i18n.t("errors.image403"));
            break;
          case 500:
            commit('setError',this.app.i18n.t("errors.image500"));
            break;
          default:
            commit('setError',this.app.i18n.t("errors.500"));
        }
      });
      return uploadImage
  },
  async add_doctor({ commit, dispatch }, doctorData) {
    commit("setError", "");
    commit("setSuccess", "");
    const imagename = await dispatch("uploadImage", doctorData.picture);
    const doctorDataWithPicture = {...doctorData};
    delete doctorDataWithPicture.picture;
    doctorDataWithPicture.picture = imagename;
    const addDoctor = this.$axios
      .post("/controlPanel/addDoctor", { ...doctorDataWithPicture })
      .then(response => {
        const responseData = response.data.data;
        commit('setSuccess',this.app.i18n.t("success.add"));

      })
      .catch(err => {
        console.log(err);
        if (!err.response) {
          commit('setError',this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 403:
            commit('setError',this.app.i18n.t("errors.403"));
            break;
          case 400:
            commit('setError',this.app.i18n.t("errors.400"));
            break;
          default:
            commit('setError',this.app.i18n.t("errors.500"));
        }
      });
  }
};

export const getters = {
  getError(state) {
    return state.error.message;
  },
  getSuccess(state) {
    return state.success.message;
  }
};
