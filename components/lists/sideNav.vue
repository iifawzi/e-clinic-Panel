<template>
  <list>

    <nuxt-link class="boldCategory" v-if="hover" event="" to="#">{{$t('dashboard.sidenav.main')}}</nuxt-link>

     <dropDownLink
      class="listItem"
      iconClass="fas fa-home"
      :label="$t('dashboard.sidenav.home')"
      linkTo="/controlPanel/dashboard/"
      exact
    >
    </dropDownLink>

 <nuxt-link class="boldCategory" v-if="hover" to="/controlPanel/dashboard/doctors" event=""> {{$t('dashboard.sidenav.doctors')}}</nuxt-link>

     <dropDownLink
      class="listItem"
      iconClass="fas fa-user-nurse"
      :label="$t('dashboard.sidenav.regDoctors')"
      linkTo="/controlPanel/dashboard/doctors/all"
    >
    </dropDownLink>

     <dropDownLink
      class="listItem"
      iconClass="fas fa-plus-square"
      :label="$t('dashboard.sidenav.addDoctor')"
     linkTo="/controlPanel/dashboard/doctors/add"
    >
    </dropDownLink>

 <nuxt-link class="boldCategory" v-if="hover" to="/controlPanel/dashboard/doctors" event=""> {{$t('dashboard.sidenav.users')}}</nuxt-link>

      <dropDownLink
      class="listItem"
      iconClass="fas fa-user-nurse"
      :label="$t('dashboard.sidenav.regUsers')"
      linkTo="/controlPanel/dashboard/users/all"
    >
    </dropDownLink>
  </list>
</template>


<script>
import list from "~/components/shared/list";
import dropDownLink from "~/components/shared/dropDownLink";
export default {
  components: {
    list,
    dropDownLink
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
        hover() {
      return this.$store.getters["controlPanel/dashboard/getSideHover"];
    },
  }
};
</script>

<style lang="scss" scoped>
.listItem{
  margin-bottom: 30px;
}
.boldCategory{
  margin-bottom: 20px;
  font-size: 20px;
}
</style>