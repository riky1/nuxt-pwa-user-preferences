<script setup>

// const isPanelOpen = ref(false)
// const panelComponent = ref(null)

// function handlePanel(payload) {
//   isPanelOpen.value = payload.isOpen
//   panelComponent.value = payload.component

//   console.log('isPanelOpen: ', isPanelOpen.value);
//   console.log('panelComponent: ', panelComponent.value);
// }
</script>

<template>
  <SitePanel />

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

.panel__wrapper {
  bottom: var(--header-height)!important;
}
</style>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  bottom: 0;
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
  background-color: var(--main-bg);
  min-height: calc(100vh - var(--header-height) - var(--footer-height));  

  @include media-query(xs) {
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
    margin-top: var(--header-height);
  }
}

footer {
  background-color: var(--main-bg);
  margin-bottom: var(--header-height);

  @include media-query(xs) {
    margin-bottom: 0;
  }
}
</style>