import Cookie from "js-cookie";
export const state = () => ({
 sideHover: false,
});

export const mutations = {
setSideHover(state,value){
    state.sideHover = value;
}
};

export const actions = {
setSideHover({commit},value){
    commit('setSideHover',value);
}
};

export const getters = {
    getSideHover(state){
        return state.sideHover;
    }
};
