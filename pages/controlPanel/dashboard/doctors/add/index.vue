<template>
    <div class="addDoctor-page">
        <div class="addDoctor-content" :class="language+'-controlPanel-padding'">


    <div class="doctorError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
<div class="addDocForm">
<addNewDoctor/>
</div>
        </div>
    </div>
</template>

<script>
import addNewDoctor from "~/components/forms/addNewDoctor"
import notfication from "~/components/shared/notfication";

export default {
  middleware: "admin-auth",
  layout: "dashboard",
  head() {
    return {
      title:
        this.language == "ar"
          ? "إضافة دكتور جديد"
          : "Control Panel | Doctors"
    };
  },
  components:{
      addNewDoctor,
      notfication
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
     error() {
      return this.$store.getters["controlPanel/doctors/getError"];
    },
  },
    mounted(){
     this.$store.commit("controlPanel/doctors/setError","");
  }
};
</script>
<style lang="scss" scoped>
.addDoctor-content{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.addDocForm {
    margin-top: 40px;
    margin-bottom: 30px;
}
</style>