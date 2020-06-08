import Cookie from "js-cookie";

export const state = () => ({
    messages: [],
    messagesError: "",
});

export const mutations = {
    setMessages(state,messages){
        state.messages = messages;
    },
    setMessagesError(state,error){
        state.messagesError = error;
    }
};

export const actions = {
  getMessagesData({ commit, dispatch }, room_id) {
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
};

export const getters = {
    getMessages(state){
        return state.messages;
    },
    getMessageError(state){
        return state.messagesError;
    }
};
