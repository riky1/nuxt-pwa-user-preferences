<script setup>

</script>

<template>
  <header>
    header
  </header>

  <main>
    <slot />
  </main>

  <footer>
    footer
  </footer>
</template>

<style lang="scss">
#__nuxt {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 10px);
}
</style>