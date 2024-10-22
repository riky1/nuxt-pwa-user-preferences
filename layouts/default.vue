<script setup>

</script>

<template>
  <header>
    <SiteHeader />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    footer
  </footer>
</template>

<style>
#__nuxt {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<style lang="scss" scoped>
// @import '../assets/scss/content-wrapper.scss';

header {
  position: sticky;
  width: 100%;
  top: 0;
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  z-index: 50; 
}

main {
  height: calc(100vh - (var(--header-height) + 1px) - var(--footer-height));
  @extend %content--wrapper;
}

footer {
  height: var(--footer-height);

  @extend %content--wrapper;
}
</style>