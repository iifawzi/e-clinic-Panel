export default async function({store,req,redirect}){
    const isAuth = await store.dispatch('controlPanel/authAdmin',req);
    if (isAuth){
    redirect("/controlPanel/dashboard");
    };
}