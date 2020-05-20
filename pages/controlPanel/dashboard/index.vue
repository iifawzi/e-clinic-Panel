<template>
  <section :class="language+'-padding'" class="clinicdash-page">
      </section>
</template>


<script>
export default {
  middleware: "admin-auth",
  layout: "dashboard",
  head() {
    return {
      title:
        this.language == "ar"
          ? "لوحة التحكم | الرئيسية"
          : "Control Panel | Home"
    };
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>