<template>
  <section class="clinicInput-component">
    <div class="clinicInput-content">
      <div class="input-div">
        <input
          class="input-box"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input',$event.target.value)"
          v-bind="$attrs"
        />
      </div>
      <span v-if="mutedText != ''" class="info-text">{{mutedText}}</span>
      <div class="error-div">
        <slot />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    placeholder: String,
    value: String,
    mutedText:{
        type: String,
        default:'',
    }
  }
};
</script>

<style lang="scss" scoped>
.clinicInput-component {
  width: 100%;
  .clinicInput-content {
    width: 100%;
    display: flex;
    flex-flow: column;
    .input-div {
      width: 100%;
      border: 1px solid $main-color;
      border-radius: 20px;
      padding: 0px 5px;
      height: 30px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      .input-box {
        width: 100%;
        border: 0px;
        height: 100%;
        background: transparent;

        &:focus {
          outline: 0px;
        }
        &::placeholder {
          margin-right: 30px;
          color: black;
        }
      }
    }
    .error-div {
      align-self: flex-start;
      color: $red;
      font-size: 12px;
      margin: 2px 10px 0px 10px;
    }
  }
}
.info-text{
    color: $greyblue;
    font-size: 12px;
    margin: 2px 10px 0px 10px;
}
</style>