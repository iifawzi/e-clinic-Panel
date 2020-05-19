export const state = () => ({
  LoginedUser:"",
  status: '',
})

export const mutations = {
login_user(state,user){
  state.LoginedUser = user;
},
setStatus(state,status){
  state.status = status;
}
}

export const actions = {
login_user({commit},userData){
  const postSign =  this.$axios.post('controlPanel/signAdmin',{...userData})
  .then(response=>{
    commit('login_user',response.data.data);
    commit('setStatus',response.status);

  }).catch(err=>{
    commit('setStatus',err.response.status);
  })
  }
}

export const getters =  {
getStatus(state){
return state.status;
},
}
