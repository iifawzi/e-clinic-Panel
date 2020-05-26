<template>
    <section class="allUsers-page">
        <div class="allUsers-content" :class="language+'-controlPanel-padding'">
          <div class="add-title">{{$t("dashboard.forms.allUsers.title")}}</div>

              <div class="doctorError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
        <div class v-if="getSuccess">
      <notfication class="doctorSuccess" color="green" :label="getSuccess" />
    </div>

          <client-only><editUser/></client-only>
        </div>
    </section>
</template>


<script>
import notfication from "~/components/shared/notfication";
import editUser from "~/components/forms/editUser";

export default {
  layout: "dashboard",
  middleware: "admin-auth",
    head() {
    return {
      title:
        this.language == "ar"
          ? "المستخدمين"
          : "Users"
    };
  },
  components:{
    notfication,
    editUser
  },
  mounted(){
    console.log("called");
    this.$store.commit("controlPanel/doctors/setDeleteDoctorSuccess","");
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
.allUsers-page {
  width: 100%;
}
.allUsers-content {
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