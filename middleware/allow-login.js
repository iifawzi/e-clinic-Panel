export default async function({store,req,redirect}){
    const isAuth = await store.dispatch('controlPanel/auth/authAdmin',req);
    if (isAuth){
    redirect("/controlPanel/dashboard");
    };
}