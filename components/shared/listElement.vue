<template>
  <li :class="hideActiveBorder ? 'smallFont' : ''" class="listElement">
    <nuxt-link
      class="listElement-statement"
      :class="[(isRouteActive && !hideActiveBorder) ?  language+'-activeBorder' : '',language+'-padding']"
      exact
      :to="linkTo"
    >
      <div class="elementItem">
        <span>
          <i :class="iconClass"></i>
        </span>
        <span v-if="hover" :class="language+'-listElement-margin'">{{label}}</span>
      </div>

      <div v-if="hover && InsideUl" class="dropDown" :class="language+'-dropIcon-margin'">
        <span>
          <i class="drop-icon fas fa-sort-down"></i>
        </span>
      </div>
    </nuxt-link>
    <div v-if="hover && InsideUl" class="droppedItems" :class="language+'-dropedItems-margin'">
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    linkTo: String,
    label: String,
    iconClass: String,
    InsideUl: String,
    hideActiveBorder : Boolean,
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
    },
    isRouteActive: function() {
      const getRoute = this.$nuxt.$route.path;
      if (getRoute == this.linkTo) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.listElement {
  list-style: none;
  width: 100%;
  color: $greyblue;
  font-size: 17px;
  padding: 0px !important;
  &-statement {
    width: 100%;
    color: $greyblue;
    height: 35px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .drop-icon {
      font-size: 15px;
      margin-bottom: 10px;
    }
  }
  .droppedItems {
    margin-top: 5px;
  }
}
.ar-listElement-margin {
  margin-right: 10px;
}
.en-listElement-margin {
  margin-left: 10px;
}
.en-dropIcon-margin {
  margin-right: 10px;
}
.ar-dropIcon-margin {
  margin-left: 10px;
}
.en-padding {
  padding-left: 30px;
  border-left: 4px solid transparent; // for spacing,
}
.ar-padding {
  padding-right: 30px;
  border-right: 4px solid transparent; // for spacing,
}
.en-dropedItems-margin {
  margin-left: 15px;
}
.ar-dropedItems-margin {
  margin-right: 15px;
}
.nuxt-link-active {
  color: $light-color;
}
.en-activeBorder {
  border-left: 4px solid $main-color;
}
.ar-activeBorder {
  border-right: 4px solid $main-color;
}
.hideActiveBorder{
    border-left: 0px;
     border-right: 0px;
}
.smallFont{
  font-size: 15px;
}
</style>


