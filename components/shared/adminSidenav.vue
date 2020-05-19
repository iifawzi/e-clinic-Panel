<template>
  <div :class="language+'adminSidenav'" class='adminSidenav-component'>
    <div
      :class="hover+'-sidenaveWidth'"
      class="adminSidenav-content"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="sidenav-top">
        <div class="adminNavbar-logo">
          <div class="logo-img"></div>
          <img src="~/assets/images/logo-colored.png" class="logo-img" />
          <h3
            v-if="hover"
            :class="language+'-marginStatement'"
            class="logo-statement"
          >{{$t("dashboard.navbar.title")}}</h3>
        </div>
      </div>
      <div class="sidenav-bottom">dd</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    };
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
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
    justify-content: space-between;
    .sidenav-top {
      height: 50px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid $bluewhite;
      border-right: 1px solid $bluewhite;
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
  }
}
.en-marginStatement {
  margin-left: 5px;
}
.ar-marginStatement {
  margin-right: 5px;
}
.en-adminSidenav{
  top: 0px;
  right: 0px;
}
.ar-adminSidenav{
      top: 0px;
  left: 0px;
}
</style>