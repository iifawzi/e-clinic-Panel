<template>
    <div class="getDoctor-component">
        <div class="getDoctor-content"  :class="language+'-controlPanel-padding'">
            hey {{this.$route.params.phone_number}}

        </div>
    </div>
</template>

<script>
export default {
    layout: "dashboard",
    middleware: "admin-auth",
      computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
  mounted(){
      const doc = this.$route.params.phone_number;
      console.log(doc);
  }
}
</script>
