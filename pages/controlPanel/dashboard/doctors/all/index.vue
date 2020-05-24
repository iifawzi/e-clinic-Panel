<template>
    <div>
        dd
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
};
</script>

<style lang="scss" scoped>

</style>