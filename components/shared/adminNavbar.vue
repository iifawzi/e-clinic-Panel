<template>
    <div class="adminNavbar-component" :class="language+'-paddingForSideNav'">
        <div class="adminNavbar-content fluid-container">
            <div class="adminNavbar-items">
                <div class="items-content">
                    <div :class="language+'-items-item'" class="items-languages">
                        <languages/>
                    </div>
                    <div :class="language+'-items-item'" class="items-user">
                        <!-- {{this.$store.getters['controlPanel/getAdmin'].name}} -->
                            {{$t('dashboard.navbar.username')}}
                    </div>
                    <div @click="logout" :class="language+'-items-item'" class="items-logout">
                        {{$t('dashboard.navbar.logout')}}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import languages from "~/components/shared/languages"
export default {
    components:{
languages,
    },
        computed:{
    language(){
      return this.$store.getters.getLocale;
    }
  },
  methods:{
      logout(){
          this.$store.dispatch('controlPanel/logout');
      }
  }
}




</script>
<style lang="scss" scoped>
.adminNavbar-component{
    background-color: #FFFFFF;
    box-shadow: 5px 7px 26px -5px $three-white;
    height: 50px;
    .adminNavbar-content{
        display: flex;
        flex-flow: row;
        height: 100%;
        justify-content: flex-end;
        align-items: center;
        .items-content{
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;
            .items-user{
                font-weight: 500;
                color: $main-color;
            }
            .items-logout{
                cursor: pointer;
            }
        }
        .en-items-item:not(:first-child){
            margin-left: 20px;
        }
        .ar-items-item:not(:last-child){
            margin-left: 20px;
        }
    }
}
.en-paddingForSideNav {
    padding-left: 80px;
}
.ar-paddingForSideNav {
    padding-right: 80px;
}
</style>