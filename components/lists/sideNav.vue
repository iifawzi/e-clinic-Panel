<template>
<adminSidelist>
<listElement iconClass="fas fa-home" :label="$t('dashboard.sidenav.home')" linkTo="dashboard">
</listElement>
        <li v-if="hover" :class="language+'-category-padding'" class="bold-category">{{$t('dashboard.sidenav.people')}}</li>
</adminSidelist>
</template>


<script>
import adminSidelist from "~/components/shared/adminSidelist"
import listElement from "~/components/shared/listElement"
export default {
    components:{
        adminSidelist,
        listElement,
    },
         computed:{
    language(){
      return this.$store.getters.getLocale;
    },
     hover(){
      return this.$store.getters['dashboard/getSideHover'];
    }
  }
}
</script>

<style lang="scss" scoped>
.SideNav{
    width: 100%;
}
.bold-category{
    font-weight: 700;
    margin-top: 20px;
}
.en-category-padding{
    padding-left: 35px;
}
.ar-category-padding{
    padding-right: 35px;
}
</style>