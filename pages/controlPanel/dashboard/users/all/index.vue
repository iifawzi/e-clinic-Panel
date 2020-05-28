<template>
  <section class="allUsers-page">
    <div class="allUsers-content" :class="language+'-controlPanel-padding'">
      <div class="add-title">{{$t("dashboard.forms.allUsers.title")}}</div>
   <div class="userProfile">
        <showUser />
      </div>
    </div>
  </section>
</template>
<script>
import notfication from "~/components/shared/notfication";
import showUser from "~/components/forms/showUser";

export default {
  layout: "dashboard",
  middleware: "admin-auth",
  head() {
    return {
      title: this.language == "ar" ? "المستخدمين" : "Users"
    };
  },
  components: {
    notfication,
    showUser,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
  mounted(){
    this.$store.commit("controlPanel/users/setGetUserError","");
    this.$store.commit("controlPanel/users/setUserData","");
  }
};
</script>
<style lang="scss" scoped>
.allUsers-page {
  width: 100%;
}
.allUsers-content {
  width: 100%;
}
.add-title {
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid $light-color;
  color: $black;
}
.userError,
.userSuccess {
  margin-top: 10px;
}
.userProfile {
  width: 100%;
}
</style>