<script setup>

const isDark = useDark()
const toggleDark = useToggle(isDark)

const toggleAndSaveTheme = () => {
  isDark.value = toggleDark() // Cambia lo stato del toggle
}

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
  <button class="btn" @click="toggleAndSaveTheme">
    <img v-if="isDark" src="/assets/icons/moon.svg" alt="">
    <img v-else src="/assets/icons/sun.svg" alt="">
  </button>
</template>

<style lang="scss" scoped>

</style>