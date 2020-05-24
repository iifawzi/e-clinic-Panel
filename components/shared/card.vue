<template>
  <div class="card-component">
    <div class="card-content" :class="color">
      <span class="card-value">{{value}}</span>
      <span class="card-label">{{label}}</span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
};
</script>


<style lang="scss" scoped>
.card-component {
  width: 100%;
  height: 100%;
}
.card-content {
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 30px;
  .card-label {
    margin-top: 10px;
  }
}

.green {
border: 2px solid rgb(193, 197, 236);
  color: rgb(15, 201, 86);
  &:hover{
    color: white;
    background-color: rgb(15, 201, 86);
  }
}
.blue {
border: 2px solid rgb(193, 197, 236);
  color: rgb(28, 60, 241);
 &:hover{
    color: white;
    background-color: rgb(28, 60, 241);
  }
}
.red {
border: 2px solid rgb(193, 197, 236);
  color: rgb(223, 58, 58);
 &:hover{
    color: white;
    background-color: rgb(223, 58, 58);
  }
}
</style>