<template>
  <div class="getDoctor-component">
    <div class="getDoctor-content" :class="language+'-controlPanel-padding'">
      <div class="edit-title">{{$t("dashboard.forms.editDoctor.title")}}</div>
      <div class="editPage-content">
        <div class="editForm">
<editDoctor :key="getAccountStatus"/>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import editDoctor from "~/components/forms/editDoctor"
export default {
  layout: "dashboard",
  middleware: "admin-auth",
  components:{
editDoctor,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
         getAccountStatus() {
      return this.$store.getters["controlPanel/doctors/accountStatus"];
      this.doctorData.avaliable = !this.doctorData.avaliable;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-title{
  font-size: 30px;
  padding-bottom: 5px;
  border-bottom: 2px solid $light-color;
  color: $black;
}
.editPage-content{
  margin-top: 30px;
  padding-bottom: 30px;
}
</style>