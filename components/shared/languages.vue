<template>
    <section class="languages-component">
  <div :class="language+'-languages'">
                              <span>
       <img v-if="language != 'ar'" @click="changeLanguage('ar')" class="language-image" src="~/assets/images/egypt.png" />
               </span>
               <span>
    <img  v-if="language != 'en'" @click="changeLanguage('en')" class="language-image" src="~/assets/images/usa.png" />
               </span>
      
    </div> 
    </section>
         
</template>

<script>
import Cookie from "js-cookie";
export default {
      methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
        Cookie.set("lang", lang);
        this.$store.dispatch('changeLang',lang);
    }
  },
    computed:{
    language(){
      return this.$store.getters.getLocale;
    }
  }
}
</script>


<style lang="scss" scoped>
.languages-component{
.language-image{
   height: 20px;
   cursor: pointer;
}
}

</style>