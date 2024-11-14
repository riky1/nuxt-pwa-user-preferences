<script setup>

definePageMeta({
  middleware: ['user-preferences']
})

const { data: preferences, status, error } = useAsyncData('preferences', async () => {
  const userPrefs = useStorePreferences()

  if (userPrefs) {
    return userPrefs.value
  }
})

</script>

<template>
  <div class="content__wrapper">
    <h1>Releases</h1>

    <div v-if="!preferences || status === 'pending'">Caricamento...</div>

    <div v-else-if="error">Errore: {{ error.message }}</div>

    <div v-else class="list__wrapper">
      <template v-for="(prefs, key) in preferences">
        <div>{{ key }}:</div>
        <div>{{ prefs }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content__wrapper {
  @extend %content--wrapper;

  .list__wrapper {
    display: grid;
    grid-template-columns: clamp(9rem, 12vw + 6rem, 12rem) auto;
  }
}
</style>