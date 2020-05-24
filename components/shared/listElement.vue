<template>
  <li @click="this.dropElements" :class="dropItems ? 'smallFont' : ''" class="listElement">


    <nuxt-link v-if="isExact"
      class="listElement-statement"
      :class="[language+'-padding']"
      :exact=isExact
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

    <!-- if the ul have another ul and we don't want to change page when clicking on the parent, so we can see the listed li, event='' make it. -->
    <nuxt-link v-if="!isExact"
      class="listElement-statement"
      :class="[language+'-padding']"
      :exact=isExact
      :to="linkTo"
      event=''
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




    <div v-if="(hover && InsideUl) && dropItems" class="droppedItems" :class="language+'-dropedItems-margin'">
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  data(){
    return {
      dropItems: false,
    }
  },
  props: {
    linkTo: String,
    label: String,
    iconClass: String,
    InsideUl: String,
   isExact: {
     type: Boolean,
     default:false,
   },
    ulItem: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    hover() {
      return this.$store.getters["controlPanel/dashboard/getSideHover"];
    },
    closeOtherDropped(){
      return this.$store.getters['controlPanel/dashboard/getCloseOtherDropped'];
    }
  },
  methods:{
    dropElements(){
      this.dropItems = !this.dropItems;
    },
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
  margin-right: 30px;
}
.ar-dropIcon-margin {
  margin-left: 30px;
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
.smallFont{
  font-size: 15px;
}
</style>


