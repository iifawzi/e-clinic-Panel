<template>
  <section :class="language+'-controlPanel-padding'" class="clinicdash-page">
    <div class="clincidash-content">
      <span class="clinic-welcome">{{$t('dashboard.welcome')}}</span>
      <div class="info-cards">
        <div class="card-container">
             <card :label="$t('dashboard.user')" color="green" value="68678" />
        </div>
     <div class="card-container" >
             <card :label="$t('dashboard.doctor')" color="blue" value="30000"/>
        </div>
         <div class="card-container" >
             <card :label="$t('dashboard.appointment')" color="red" value="50000"/>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import card from "~/components/shared/card";
export default {
  middleware: "admin-auth",
  layout: "dashboard",
  components: {
    card
  },
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
      padding-top: 100px;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  .clinic-welcome {
    font-size: 25px;
    color: $main-color;
  }
  .info-cards{
    padding-top: 30px;
    width:100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    .card-container{
      width: 200px;
      height: 200px;
    }
    .card-container:not(first-child){
      margin-top: 30px;
      align-self: center;
    }
  }
}
</style>