<template>
  <div>
    <adminSidenav/>
      <adminNavbar/>
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
    language(){
      return this.$store.getters.getLocale;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>