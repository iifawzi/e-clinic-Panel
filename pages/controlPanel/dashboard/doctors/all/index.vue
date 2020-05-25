<template>
    <section class="allDoctors-page">
        <div class="allDoctors-content" :class="language+'-controlPanel-padding'">
          <div class="add-title">{{$t("dashboard.forms.allDoctors.title")}}</div>

              <div class="doctorError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
        <div class v-if="getSuccess">
      <notfication class="doctorSuccess" color="green" :label="getSuccess" />
    </div>

          <client-only><DoctrosTable :key="shouldUpdate"/></client-only>
        </div>
    </section>
</template>


<script>
import DoctrosTable from "~/components/tables/doctors"
import notfication from "~/components/shared/notfication";

export default {
  layout: "dashboard",
  middleware: "admin-auth",
  data: {
    return: {
shouldUpdate:0,
    },
  },
    head() {
    return {
      title:
        this.language == "ar"
          ? "الدكاترة المُسجلين"
          : "Registered Doctors"
    };
  },
  components:{
    DoctrosTable,
    notfication
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
        error() {
      return this.$store.getters["controlPanel/doctors/getDeleteError"];
    },
    getSuccess() {
      this.shouldUpdate +=1;
      return this.$store.getters["controlPanel/doctors/getDeleteSuccess"];
    },
  },
};
</script>
<style lang="scss" scoped>
.allDoctors-page {
  width: 100%;
}
.allDoctors-content {
  width: 100%;
}
.add-title{
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid $light-color;
  color: $black;
}
.doctorError, .doctorSuccess {
margin-top:10px;
}
</style>