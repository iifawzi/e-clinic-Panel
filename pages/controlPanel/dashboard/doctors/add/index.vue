<template>
    <div class="doctors-add">
        
    </div>
</template>

<script>
export default {
  middleware: "admin-auth",
  layout: "dashboard",
  head() {
    return {
      title:
        this.language == "ar"
          ? "لوحة التحكم | الدكاترة"
          : "Control Panel | Doctors"
    };
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  }
};
</script>
