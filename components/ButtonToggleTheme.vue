<script setup>

const isDark = useDark()
const [darkMode, toggleDark] = useToggle(isDark.value)

const cookie = useCookie('dark-mode')

const updateTheme = (event) => {
  isDark.value = event.matches
  darkMode.value = isDark.value
}
  
if (cookie && cookie.value !== undefined) {
  darkMode.value = cookie
  isDark.value = darkMode.value
} else if (import.meta.client) {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  isDark.value = darkModeMediaQuery.matches

  darkModeMediaQuery.addEventListener('change', updateTheme)

  onUnmounted(() => {
    darkModeMediaQuery.removeEventListener('change', updateTheme);
  })
}

const toggleAndSaveTheme = () => {
  darkMode.value = toggleDark()
  isDark.value = darkMode.value
  cookie.value = darkMode.value
}

onMounted(() => {
  darkMode.value = isDark.value
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: () => (isDark.value ? './_root-dark.css' : './_root-light.css')
    }
  ]
})
</script>

<template>
  <button class="btn" @click="toggleAndSaveTheme">
    <img v-if="darkMode" src="/assets/icons/moon.svg" alt="Icona tema scuro">
    <img v-else src="/assets/icons/sun.svg" alt="Icona tema chiaro">
  </button>
</template>

<style lang="scss" scoped>

</style>