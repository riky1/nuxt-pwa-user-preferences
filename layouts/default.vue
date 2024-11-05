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
    <SiteFooter />
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
  color: var(--text-primary);
  height: calc(100vh - (var(--header-height) + 2px) - var(--footer-height));
  background-color: var(--main-bg);
  // @extend %content--wrapper;
}

footer {
  background-color: var(--main-bg);
  border-top: 1px solid var(--footer-border);

  // @extend %content--wrapper;
}
</style>