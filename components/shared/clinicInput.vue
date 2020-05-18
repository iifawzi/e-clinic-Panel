<template>
    <section class="clinicInput-component">
        <div class="clinicInput-content">
            <div class="input-div">
                <input class="input-box" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)" v-bind="$attrs"/>
            </div>
            <div class="error-div">
                <slot/>
            </div>
        </div>
    </section>
</template>
<script>
export default {
      props: {
    placeholder: String,
    value: String,
  }
}
</script>

<style lang="scss" scoped>
.clinicInput-component{
    width: 100%;
.clinicInput-content{
        width: 100%;
    display: flex;
    flex-flow: column;
    .input-div{
          width: 100%;
          border: 1px solid $main-color;
          border-radius: 20px;
          padding: 0px 5px;  
          height: 30px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          .input-box{
              width: 100%;
              border: 0px;
              height: 100%;
                background: transparent;
              &:focus{
                  outline: 0px;
              }
              &::placeholder{
                  margin-right: 30px;
                  font-size: 12px;
              }
          }
    }
    .error-div{
        margin-top: 5px;
        align-self: flex-start;
    }
}
}
</style>