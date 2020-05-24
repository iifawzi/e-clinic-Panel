<template>
  <div>
    <div class="clinicSelect-component">
      <div class="clinicSelect-content">
        <select v-bind="$attrs" @change="$emit('change', $event.target.value)" class="selectInput">
          <slot />
        </select>
      </div>
    </div>
 <span v-if="mutedText != ''" class="info-text">{{mutedText}}</span>
    <div class="error-div">
      <slot name="errorSlot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mutedText: {
      type: String,
      default: ""
    }
  }
};
</script>


<style lang="scss" scoped>
.clinicSelect-component {
  display: flex;
  font-size: 15px;
  .clinicSelect-content {
    width: 100%;
    border: 1px solid $main-color;
    border-radius: 50px;
    padding: 0px 5px;
    height: 30px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
}
.selectInput {
  width: 100%;
  background-color: transparent;
  outline: none;
  border: 0px;
  &:focus {
    outline: none;
  }
}
.error-div {
  align-self: flex-start;
  color: $red;
  font-size: 12px;
  margin: 2px 10px 0px 10px;
}
.info-text {
  color: $greyblue;
  font-size: 12px;
  margin: 2px 10px 0px 10px;
}
</style>