<template>
  <section class="loginForm-component">
    <div class="loginForm-content">
      <div class="input-div">
        <clinicInput :placeholder="$t('panel.loginForm.username')" />
      </div>
      <div class="input-div">
        <clinicInput :placeholder="$t('panel.loginForm.password')" />
      </div>
      <div class="submit-div">
        <clinicSubmit color="blue" :statement="$t('panel.loginForm.submit')" />
      </div>
    </div>
  </section>
</template>
<script>
import clinicInput from "~/components/shared/clinicInput";
import clinicSubmit from "~/components/shared/clinicSubmit";
export default {
  components: {
    clinicInput,
    clinicSubmit
  }
};
</script>

<style lang="scss" scoped>
.loginForm-component {
  width: 100%;
  .loginForm-content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .input-div {
      width: 100%;
    }
    .submit-div {
      width: 100%;
      margin-top: 10px;
    }
    .input-div:not(:first-child) {
      margin-top: 5px;
    }
  }
}
</style>