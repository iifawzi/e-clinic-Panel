export const state = () => ({
 sideHover: false,
});

export const mutations = {
setSideHover(state,value){
    if (state.sideHover != value){
        state.sideHover = value;
    }
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
