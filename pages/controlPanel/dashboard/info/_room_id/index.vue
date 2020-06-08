<template>
  <section :class="language+'-controlPanel-padding'" class="info-page">
      <div class="info-title">{{$t("dashboard.info.title")}}</div>
    <div class="info-content">
  <div class="mainRow">
      <div class="info">info here</div>
      <div class="chat"><chat/></div>
  </div>
    </div>
  </section>
</template>


<script>
import chat from "~/components/blocks/chat"
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
  components:{
      chat,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    }
  }
};
</script>
<style lang="scss" scoped>
.info-content {
  margin-top: 40px;
}
.mainRow {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    .info {
        width: 30%;
    }
    .chat {
        width: 50%;
    }
}
.info-title{
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid $light-color;
  color: $black;
}
</style>