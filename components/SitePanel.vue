<script setup>
const { isOpen, closePanel, content } = usePanel()
</script>

<template>  
  <div class="panel__overlay" :class="{ 'open': isOpen }" @click="closePanel"></div>
  <div class="panel__wrapper" :class="{ 'open': isOpen }">
    <p>Ciao</p>
    <component :is="content"></component>
  </div>  
</template>

<style lang="scss" scoped>
.panel__overlay {
  position: fixed;
  width: 100%;
  height: 0;
  background-color: var(--modal-bg);
  visibility: hidden;
  opacity: 0;
  // top: calc(-100vh + var(--header-height));
  transition: all 0.3s ease;

  @include media-query(xs) {
    top: calc(var(--header-height) + 1px);
  }

  &.open {
    height: 100%;
    visibility: visible;
    opacity: 0.5;
  }
}

.panel__wrapper {
  position: fixed;
  width: 100%;
  height: 0;
  background-color: var(--main-bg);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  left: 0;
  // bottom: calc(var(--header-height) + 1px);
  bottom: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  // z-index: 2;

  @include media-query(xs) {
    // bottom: calc(-100vh + var(--header-height) + 1px);
    bottom: 0;
  }

  &.open {
    height: calc(60vh - var(--header-height) - 2px);
    visibility: visible;
    transition: all 0.3s ease;
  }
}
</style>