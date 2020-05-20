<template>
  <adminSidelist>
    <listElement
      iconClass="fas fa-home"
      :label="$t('dashboard.sidenav.home')"
      linkTo="/controlPanel/dashboard"
    ></listElement>
    <li
      v-if="hover"
      :class="language+'-category-padding'"
      class="bold-category"
    >{{$t('dashboard.sidenav.manage')}}</li>
    <listElement
      InsideUl="true"
      class="margin-top-element"
      iconClass="fas fa-user-nurse"
      :label="$t('dashboard.sidenav.doctors')"
      linkTo="/controlPanel/dashboard/doctors"
    >
    
   <adminSideList>
           <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.regDoctors')"
      linkTo="/controlPanel/dashboard/doctors/register"
    ></listElement>
               <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.addDoctor')"
      linkTo="/controlPanel/dashboard/doctors/add"
    ></listElement>

               <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.editDoctor')"
      linkTo="/controlPanel/dashboard/doctors/edit"
    ></listElement>
   </adminSideList>
    </listElement>
     <li
      v-if="hover"
      :class="language+'-category-padding'"
      class="bold-category"
    >{{$t('dashboard.sidenav.users')}}</li>

  <listElement
      InsideUl="true"
      class="margin-top-element"
      iconClass="fas fa-user"
      :label="$t('dashboard.sidenav.users')"
      linkTo="/controlPanel/dashboard/users"
    >
    
   <adminSideList>
           <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.regUsers')"
      linkTo="/controlPanel/dashboard/users/register"
    ></listElement>
               <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.addUser')"
      linkTo="/controlPanel/dashboard/users/add"
    ></listElement>

               <listElement
           :hideActiveBorder=true
      :iconClass="language == 'en' ? 'fas fa-caret-right' : 'fas fa-caret-left'"
      :label="$t('dashboard.sidenav.editUser')"
      linkTo="/controlPanel/dashboard/users/edit"
    ></listElement>
   </adminSideList>
    </listElement>
    
  </adminSidelist>
</template>


<script>
import adminSidelist from "~/components/shared/adminSidelist";
import listElement from "~/components/shared/listElement";
export default {
  components: {
    adminSidelist,
    listElement
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    hover() {
      return this.$store.getters["dashboard/getSideHover"];
    }
  }
};
</script>

<style lang="scss" scoped>
.margin-top-element {
  margin-top: 20px;
}
.bold-category {
  font-weight: 400;
  margin-top: 20px;
}
.en-category-padding {
  padding-left: 35px;
}
.ar-category-padding {
  padding-right: 35px;
}
</style>