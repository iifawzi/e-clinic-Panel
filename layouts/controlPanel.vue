<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
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