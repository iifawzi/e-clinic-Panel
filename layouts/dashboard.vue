<template>
  <div>
      <adminNavbar/>
    <nuxt />
  </div>
</template>
<script>
import adminNavbar from "~/components/shared/adminNavbar";
export default {
    components:{
adminNavbar,
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
body{
    background-color:red;
}
</style>