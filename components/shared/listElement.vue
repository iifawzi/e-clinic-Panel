<template>
  <li :class="language+'-listElement-border'" class="listElement">
    <nuxt-link class="listElement-statement" exact :to="linkTo">
      <span>
        <i :class="iconClass"></i>
      </span>
      <span v-if="hover" :class="language+'-listElement-margin'">{{label}}</span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    linkTo: String,
    label: String,
    iconClass: String,
    ulItem: {
      type: Boolean,
      default: false
    }
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
.listElement {
  list-style: none;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  color: $greyblue;
  font-size: 18px;
  &-statement {
    color: $greyblue;
  }
  .nuxt-link-active {
    color: $light-color;
  }
}
.ar-listElement-margin {
  margin-right: 5px;
}
.en-listElement-margin {
  margin-left: 5px;
}
.ar-listElement-border {
  border-right: 4px solid $main-color;
  padding-right: 30px;
}
.en-listElement-border {
  border-left: 4px solid $main-color;
  padding-left: 30px;
}
</style>


