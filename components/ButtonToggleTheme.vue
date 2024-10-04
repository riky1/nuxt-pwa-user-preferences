<script setup>

const [value, toggle] = useToggle()

const toggleAndSaveTheme = () => {
  toggle(); // Cambia lo stato del toggle
};

</script>

<template>
  <p>Value: {{ value }}</p>

  <button @click="toggleAndSaveTheme">
    <span v-if="value">🌙 Dark Mode</span>
    <span v-else>☀️ Light Mode</span>
  </button>
</template>

<style lang="scss" scoped>

</style>