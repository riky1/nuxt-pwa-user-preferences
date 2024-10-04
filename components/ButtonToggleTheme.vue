<script setup>

const props = defineProps({
  isDarkValue: {
    type: Boolean,
    default: false,
  }
})

const [isDark, toggle] = useToggle(props.isDarkValue)

const toggleAndSaveTheme = () => {
  toggle() // Cambia lo stato del toggle
}

// TODO: inserire logica nell'header affinchè funzioni in tutte le pagine

// TODO: salvare preferenze nei cookie e idb

useHead({
  bodyAttrs: {
    class: { 'dark': isDark }
  }
})
</script>

<template>
  <p>Value: {{ isDark }}</p>

  <button @click="toggleAndSaveTheme" :class="['button_toggle--theme', { dark: isDark }]">
    <span v-if="isDark">🌙 Dark Mode</span>
    <span v-else>☀️ Light Mode</span>
  </button>
</template>

<style lang="scss" scoped>
.button_toggle--theme {
  font-size: 16px;
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: 1px solid #9f9f9f;
  border-radius: 20px;
  cursor: pointer;  
  transition: background-color 0.3s ease;

  &.dark {
    color: white;
    background-color: #333;    
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>