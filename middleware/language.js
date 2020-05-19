import Cookie from "js-cookie";
export default function (context) {
if (context.req){
  if(!context.req.headers.cookie){
    return
  };
  const cookies = context.req.headers.cookie;
  const language = cookies.split(";").find(c => c.trim().startsWith("lang")).split("=")[1];
  if (language){
    context.store.dispatch('changeLang',language);
    context.app.i18n.locale = language;
  }else {
    return;
  }
}else {
  console.log("hala");
  const language = Cookie.get('lang');
  if (!language){
    context.store.dispatch('changeLang','ar');
    context.app.i18n.locale = 'ar';
  }else {
    context.store.dispatch('changeLang',language);
    context.app.i18n.locale = language;
  }
}
  }