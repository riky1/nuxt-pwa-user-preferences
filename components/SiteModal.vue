<script setup>
  const props = defineProps({
    isOpen: Boolean,
  })
</script>

<template>
  <div class="modal__overlay" :class="{ 'open': isOpen }"></div>
  <div class="modal__wrapper" :class="{ 'open': isOpen }">
    <slot name="content"></slot>
  </div>
</template>

<style lang="scss" scoped>
.modal__overlay {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--modal-bg);
  opacity: 0;
  top: calc(-100vh + var(--header-height) - 0.5rem);
  transition: all 0.3s ease;
  z-index: 1;

  @include media-query(xs) {
    top: calc(var(--header-height) + 1px);
  }

  &.open {
    height: calc(100vh - var(--header-height) + 0.5rem - 1px);
    opacity: 0.5;
  }
}

.modal__wrapper {
  position: absolute;
  width: 100%;
  height: 0;
  background-color: var(--modal-bg);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  left: 0;
  bottom: calc(var(--header-height) - 0.5rem + 1px);
  transition: all 0.3s ease;
  z-index: 2;

  @include media-query(xs) {
    bottom: calc(-100vh + var(--header-height) + 1px);
  }

  &.open {
    height: calc(60vh - var(--header-height) - 2px);
    transition: all 0.3s ease;
  }
}
</style>