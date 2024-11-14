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
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: var(--header-bg);
  border-top: 1px solid var(--header-border);
  z-index: 50; 

  @include media-query(xs) {
    top: 0;
    bottom: auto;
    border-top: none;
    border-bottom: 1px solid var(--header-border);
  }
}

main {
  color: var(--text-primary);
  height: calc(100vh - (var(--header-height) - 0.5rem) - var(--footer-height));
  background-color: var(--main-bg);

  @include media-query(xs) {
    height: calc(100vh - var(--header-height) - var(--footer-height));
    margin-top: var(--header-height);
  }
}

footer {
  background-color: var(--main-bg);
}
</style>