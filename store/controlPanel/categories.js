import Cookie from "js-cookie";

export const state = () => ({
    categories: [],
});

export const mutations = {
set_categories(state,categories){
    state.categories = categories;
}
};

export const actions = {
    getCategories ({commit}){
        const token = Cookie.get('token');
        const config = {
            headers: { 
              'Authorization': "Bearer "+token, 
              }
            }
        const getCategories = this.$axios
        .get("/controlPanel/getCategories",config)
        .then(response=>{
            commit("set_categories",response.data.data);
        }).catch(err=>{
            console.log(err);
        })
    }
};

export const getters = {
get_categories(state){
    return state.categories;
}
};
