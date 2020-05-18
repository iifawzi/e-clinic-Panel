<template>
     <section>
         about paggge
    <h1>{{ $t("title") }}</h1>
    <nuxt-link to="/about">About</nuxt-link>
    <div>
      <button @click="changeLanguage('en')">EN</button>       
      <button @click="changeLanguage('ar')">ar</button>
    </div>
  </section>
</template>

<script>
import Cookie from "js-cookie";

export default {
  methods: {
    changeLanguage(lang) {  
       this.$i18n.locale = lang;
       if(Cookie.get("lang") != lang){
        Cookie.set("lang", lang);
        this.$store.dispatch('changeLang',lang);
       }

    }
  }
};
</script>

