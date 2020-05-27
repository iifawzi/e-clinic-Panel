<template>
  <section :class="language+'-controlPanel-padding'" class="clinicdash-page">
    <div class="clincidash-content">
   <div class="home-welcome">
 <img src="~/assets/images/logo.png" class="logo-img" />
    <h1 class="index-title">{{ $t('dashboard.welcome') }}</h1>
   </div>
    </div>
  </section>
</template>


<script>
export default {
  middleware: "admin-auth",
  layout: "dashboard",
  head() {
    return {
      title:
        this.language == "ar"
          ? "لوحة التحكم | الرئيسية"
          : "Control Panel | Home"
    };
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    }
  }
};
</script>

<style lang="scss" scoped>
.clincidash-content {
   .home-welcome{
      text-align: center;
  margin-top: 100px;
.index-title{
  font-size: 50px;
  margin-top: 20px;
  color:$main-color;
}
.logo-img{
  height: 300px;
}
  }
}
</style>