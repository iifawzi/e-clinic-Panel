<template>
   <nuxt-link :to="linkTo" class="main-element" :exact="exact">
       <div class="element-content">
 <div class="element-info">
        <div>
          <i :class="iconClass"></i>
        </div>
        <div v-if="hover" :class="language+'-listElement-margin'">{{label}}</div>
      </div>
</div>
   </nuxt-link>
</template>

<script>
export default {
  props: {
    linkTo: String,
    label: String,
    iconClass: String,
    exact:{
      type:Boolean,
      default: false,
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    hover() {
      return this.$store.getters["controlPanel/dashboard/getSideHover"];
    },
  },
};
</script>

<style lang="scss" scoped>
.main-element{
    width: 100%;
         color: $greyblue;
}
.element-content{
    width: 100%;
    display: flex;
    flex-flow: row;
    font-size: 16px;
    .element-info {
        display: flex;
    }

}
.ar-listElement-margin {
  margin-right: 10px;
}
.en-listElement-margin {
  margin-left: 10px;
}
.nuxt-link-active {
  color: $light-color;
}
</style>