<template>
  <div :class="language+'-adminSidenav'" class="adminSidenav-component">
    <div
      :class="hover+'-sidenaveWidth'"
      class="adminSidenav-content"
      @mouseover="updateHover(true)"
      @mouseleave="updateHover(false)"
    >
      <div class="sidenav-top">
        <div class="adminNavbar-logo">
          <div class="logo-img"></div>
          <img src="~/assets/images/logo-colored.png" class="logo-img" />
          <h3
            v-if="this.hover"
            :class="language+'-marginStatement'"
            class="logo-statement"
          >{{$t("dashboard.navbar.title")}}</h3>
        </div>
      </div>
      <div class="sidenav-bottom">
        <sideNav />
      </div>
    </div>
  </div>
</template>

<script>
import sideNav from "~/components/lists/sideNav";
export default {
  components: {
    sideNav
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    hover(){
      return this.$store.getters['dashboard/getSideHover'];
    }
  },
  methods:{
    updateHover(value){
      this.$store.commit('dashboard/setSideHover',value);
    }
  }
};
</script>

<style lang="scss" scoped>
.true-sidenaveWidth {
  width: 260px;
}
.false-sidenaveWidth {
  width: 80px;
}
.adminSidenav-component {
  position: fixed;
  height: 100vh;
  background-color: white;
  z-index: 1000;
  .adminSidenav-content {
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    .sidenav-top {
      height: 50px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
          box-shadow: 5px 7px 26px -5px $three-white;
      width: 100%;
      .adminNavbar-logo {
        display: flex;
        flex-flow: row;
        align-items: center;
        .logo-img {
          height: 30px;
        }
      }
    }
    .sidenav-bottom {
      padding-top: 30px;
      align-self: flex-start;
      width: 100%;
    }
  }
}
.en-marginStatement {
  margin-left: 5px;
}
.ar-marginStatement {
  margin-right: 5px;
}
.ar-adminSidenav {
  top: 0px;
  right: 0px;
}
.en-adminSidenav {
  top: 0px;
  left: 0px;
}
</style>