<template>
    <div class="addDoctor-page">
        <div class="addDoctor-content" :class="language+'-controlPanel-padding'">
<span class="controlPanel-PageTitle">{{$t('dashboard.sidenav.addDoctor')}}</span>
<div class="addDocForm">
<addNewDoctor/>
</div>
        </div>
    </div>
</template>

<script>
import addNewDoctor from "~/components/forms/addNewDoctor"
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
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
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