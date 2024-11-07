<script setup>

const { darkMode, toggleTheme } = useTheme()

</script>

<template>
  <button class="btn" @click="toggleTheme">
    <img v-if="darkMode" src="/assets/icons/moon.svg" alt="Icona tema scuro">
    <img v-else src="/assets/icons/sun.svg" alt="Icona tema chiaro">
  </button>
</template>

<style lang="scss" scoped>

</style>