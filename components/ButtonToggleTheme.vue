<script setup>

const { getCookie, setCookie } = useCookies("dark-mode")

const isDark = useDark()
const toggleDark = useToggle(isDark)
const darkMode = ref()

const cookie = getCookie()

if (cookie !== undefined) {
  darkMode.value = cookie
  isDark.value = darkMode.value
} else if (import.meta.client) {
  isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches
  
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
    isDark.value = event.matches
    darkMode.value = isDark.value
  })
}

const toggleAndSaveTheme = () => {
  darkMode.value = toggleDark()
  isDark.value = darkMode.value
  setCookie(darkMode.value)
}

onMounted(() => {
  darkMode.value = isDark.value
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: () => {
        if (isDark.value) {
          return './_root-dark.css'
        }

        return'./_root-light.css'
      }
    }
  ]
})
</script>

<template>
  <button class="btn" @click="toggleAndSaveTheme()">
    <img v-if="darkMode" src="/assets/icons/moon.svg" alt="">
    <img v-else src="/assets/icons/sun.svg" alt="">
  </button>
</template>

<style lang="scss" scoped>

</style>