<template>
  <section class="controlLogin-page">
    <div :class="language+'-language_div'">
      <languages />
    </div>
    <div class="login-container">
      <div class="login-statment">
        <h1>{{$t('panel.title')}}</h1>
      </div>
      <div class="login-form">
        <loginForm />
      </div>
    </div>
  </section>
</template>

<script>
import languages from "~/components/shared/languages";
import loginForm from "~/components/forms/login";

export default {
    middleware: 'allow-login',
  head() {
    return {
      title:
        this.language == "ar"
          ? "تسجيل دخول | لوحة التحكم"
          : "Login | Control Panel"
    };
  },

  components: {
    languages,
    loginForm
  },
  //
  computed: {
    language() {
      return this.$store.getters.getLocale;
    }
  }
};
</script>

<style lang="scss" scoped>
.controlLogin-page {
  height: 100vh;
  overflow-x: hidden;
  .ar-language_div {
    margin-right: 10px;
    margin-top: 10px;
  }
  .en-language_div {
    margin-left: 10px;
    margin-top: 10px;
  }
  .login-container {
    margin-top: 100px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .login-statment {
      font-size: 25px;
      color: $main-color;
      display: flex;
      flex-flow: column;
      align-items: center;
      .logo-img {
        margin-top: 40px;
        height: 100px;
      }
    }
    .login-form {
      margin-top: 30px;
      width: 300px;
    
    }
  }
}
</style>