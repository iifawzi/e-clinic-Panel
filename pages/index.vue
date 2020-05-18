<template>
<section class="index-component">
 <div :class="language+'-main'">
   <div class="languages-div"><languages/></div> 
   <div class="home-welcome">
 <img src="~/assets/images/logo.png" class="logo-img" />
    <h1 class="index-title">{{ $t('home.title') }}</h1>
   </div>
  </div>
</section>
</template>

<script>
import languages from "~/components/shared/languages"
export default {
  layout:'default',
  components:{
    languages,
  },
  // 
  head() {
    return {
      title: this.language == "ar" ? "الصفحة الرئيسية" : "Home Page!",
    };
  },
  computed:{
    language(){
      return this.$store.getters.getLocale;
    }
  }
  // 
};
</script>

<style lang="scss" scoped>
.index-component{
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

.ar-main{
  .languages-div{
  margin-right: 20px;
  margin-top:20px;
}
}
.en-main{
  .languages-div{
  margin-left: 20px;
  margin-top:20px;
}
}
}
</style>

