<template>
  <ul class="adminSlidelist-ul">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.adminSlidelist-ul {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  list-style-type: none;
}
</style>