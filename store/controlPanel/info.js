import Cookie from "js-cookie";

export const state = () => ({
    messages: [],
    messagesError: "",
    prescriptionError:"",
    prescription:""
});

export const mutations = {
    setMessages(state,messages){
        state.messages = messages;
    },
    setMessagesError(state,error){
        state.messagesError = error;
    },
    setPrescription(state,prescription){
        state.prescription = prescription;
    },
    setPrescriptionError(state,error){
        state.prescriptionError = error;
    }
};

export const actions = {
  getMessagesData({ commit }, room_id) {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    commit("setMessages", "");
    commit("setMessagesError", "");
    this.$axios
      .post("/messages/getFinishedMessages", {room_id}, config)
      .then(response => {
        commit("setMessages", response.data.data);
      })
      .catch(err => {
          console.log(err.response);
        if (!err.response) {
          commit("setMessagesError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 400:
            commit("setMessagesError", this.app.i18n.t("errors.400"));
            break;
          default:
            commit("setMessagesError", this.app.i18n.t("errors.500"));
        }
      });
  },

  getPrescriptionData({ commit }, room_id) {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    commit("setPrescription", "");
    commit("setPrescriptionError", "");
    this.$axios
      .post("/prescriptions/getPrescription", {room_id}, config)
      .then(response => {
          console.log(response);
        commit("setPrescription", response.data.data);
      })
      .catch(err => {
          console.log(err.response);
        if (!err.response) {
          commit("setPrescriptionError", this.app.i18n.t("errors.500"));
        }
        const status = err.response.status;
        switch (status) {
          case 400:
            commit("setPrescriptionError", this.app.i18n.t("errors.400"));
            break;
          default:
            commit("setPrescriptionError", this.app.i18n.t("errors.500"));
        }
      });
  },
};

export const getters = {
    getMessages(state){
        return state.messages;
    },
    getMessageError(state){
        return state.messagesError;
    },
    getPrescription(state){
       return state.prescription
    },
    getPrescriptionError(state){
        return state.prescriptionError;
    }
};
