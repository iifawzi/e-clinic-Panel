<template>
  <div class="getDoctor-component">
    <div class="getDoctor-content" :class="language+'-controlPanel-padding'">
      <div class="edit-title">{{$t("dashboard.forms.editDoctor.title")}}</div>
      <div class="editPage-content">
        <div class="editForm">
          <!-- update cimponent when status changed (active/not active) -->
<editDoctor :key="getAccountStatus"/> 
        </div>
           <div class="slotsTable">
             <div class="slots-title">{{$t('dashboard.tables.slots.title')}}</div>
         <client-only> <slotsTable/></client-only>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import editDoctor from "~/components/forms/editDoctor"
import slotsTable from "~/components/tables/slots"

export default {
  layout: "dashboard",
  middleware: "admin-auth",
      head() {
    return {
      title:
        this.language == "ar"
          ? "تعديل دكتور"
          : "Edit Doctor"
    };
  },
  components:{
editDoctor,
    slotsTable,

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
  display: flex;
  flex-flow: row;
  justify-content: space-between
}
.slotsTable {
  width: 75%;
}
.slots-title{
  font-size: 30px;
  text-align: center;
  color: $black;
}
</style>