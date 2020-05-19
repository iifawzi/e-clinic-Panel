export const state = () => ({
  LoginedAdmin:"",
  status: '',
})

export const mutations = {
login_admin(state,user){
  state.LoginedUser = user;
},
setStatus(state,status){
  state.status = status;
}
}

export const actions = {
  login_admin({commit},adminData){
  const postSign =  this.$axios.post('controlPanel/signAdmin',{...adminData})
  .then(response=>{
    commit('login_admin',response.data.data);
    commit('setStatus',response.status);
  }).catch(err=>{
    if (!err.response){
      commit('setStatus',500);
    };
    commit('setStatus',err.response.status);
  })
  }
}

export const getters =  {
getStatus(state){
return state.status;
},
isAuthenticated(state){
  return state.LoginedAdmin.token != null;
},
getAdmin(state){
  return state.LoginedAdmin;
}
}
