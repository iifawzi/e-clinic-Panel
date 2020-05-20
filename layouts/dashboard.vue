<template>
  <div>
    <adminSidenav/>
      <adminNavbar/>
       <div v-if="hover" @click="this.updateHover(false)" class="backdrop"></div>
    <nuxt />
  </div>
</template>
<script>
import adminNavbar from "~/components/shared/adminNavbar";
import adminSidenav from "~/components/shared/adminSidenav";
export default {
    components:{
adminNavbar,
adminSidenav
    },
      head() {
    return {
    htmlAttrs: {
      lang: this.language,
    },
    bodyAttrs:{
               dir: this.language == 'ar' ? 'rtl' : 'ltr',
    },
    meta: [
 {name: 'robots', content: 'noindex,nofollow' },
    ]
  }
  },
    computed:{
       hover(){
      return this.$store.getters['dashboard/getSideHover'];
    },
    language() {
      return this.$store.getters.getLocale;
    },
    methods: {
       updateHover(value){
      this.$store.commit('dashboard/setSideHover',value);
    }
    },
  }
}
</script>

<style lang="scss" scoped>
.backdrop{
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: $hoverColor;
  z-index: 800;
}
</style>