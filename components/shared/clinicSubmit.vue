<template>
  <section class="clinicSubmit-component">
    <div :class="'clinicSubmit-content ' + color ">
      <button type="submit" class="btn-box" @click="$emit('click',$event)">{{statement}}</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    statement: String,
    color: String,
  }
};
</script>

<style lang="scss" scoped>
.clinicSubmit-component {
  width: 100%;
     height: 100%;
  .clinicSubmit-content {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 10px;

    .btn-box {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: 0px;
      color: white;
      font-size: 18px;
      outline: 0px;
      cursor: pointer;
    }
  }
  .blue {
    background-color: $main-color;
    &:active {
      outline: 0px;
    }
    &:hover {
      background-color: $light-color;
    }
  }
   .green {
    background-color: $green-color;
    &:active {
      outline: 0px;
    }
    &:hover {
      background-color: $green-hover;
    }
  }
}
</style>