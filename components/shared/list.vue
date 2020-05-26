<template>
  <div class="adminSlidelist-ul">
    <slot />
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.adminSlidelist-ul {
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 0px;
  list-style-type: none;
}
</style>