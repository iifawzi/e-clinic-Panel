export default function({store,req}){
    store.dispatch('controlPanel/authAdmin',req);
}