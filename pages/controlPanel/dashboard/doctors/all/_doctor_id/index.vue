<template>
  <div class="getDoctor-component">
    <div class="getDoctor-content" :class="language+'-controlPanel-padding'">
      <div class="edit-title">{{$t("dashboard.forms.editDoctor.title")}}</div>
      <div class="editPage-content">
        <div class="editForm">
          <!-- update component when status changed (active/not active) -->
<editDoctor :key="getAccountStatus"/> 
        </div>
           <div class="slotsTable">
         <client-only> <slotsTable/></client-only>
                  <addSlot  v-if="admin.role === 'admin'"/>
               <client-only> <docsApps :key="slots" /></client-only>
                 <addApp  v-if="admin.role === 'admin'" :key="apps"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import editDoctor from "~/components/forms/editDoctor"
import addSlot from "~/components/forms/addSlot"
import addApp from "~/components/forms/addApp"
import slotsTable from "~/components/tables/slots"
import docsApps from "~/components/tables/docsApps"

export default {
  layout: "dashboard",
  middleware: "admin-auth",
  mounted(){
    this.admin = this.$store.getters["controlPanel/auth/getAdmin"];
  },
      head() {
    return {
      title:
        this.language == "ar"
          ? "تعديل دكتور"
          : "Edit Doctor"
    };
  },
  data(){
    return {
      admin: '',
      updateApps: 0,
      updateAdd: 45,
      updateEdit: 100,
    }
  },
  components:{
editDoctor,
    slotsTable,
    addSlot,
    docsApps,
    addApp

  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
         getAccountStatus() {
      return this.$store.getters["controlPanel/doctors/accountStatus"];
      this.doctorData.available = !this.doctorData.available;
    },
    slots() {
      const slotts = this.$store.getters["controlPanel/slots/getSlots"];
      return this.updateApps +=1;
    },
        apps() {
      const apps = this.$store.getters["controlPanel/appointments/getDocAppointments"];
      return this.updateAdd +=1;
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
.editForm{
  width: 20%;
}
.slotsTable {
  width: 75%;
}


</style>