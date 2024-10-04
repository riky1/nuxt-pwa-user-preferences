<script setup>

definePageMeta({
  middleware: ['user-preferences']
})

const isDark = ref()

const { data: preferences, status, error } = useAsyncData('user-preferences', async () => {
  
  const userPrefs = useStorePreferences();

  if (userPrefs.value) {
    if (userPrefs.value.theme === 'dark') {
      isDark.value = true
    }
    
    return userPrefs.value;
  }
  
  // Se non ci sono preferenze, ritorna un oggetto vuoto o un fallback
  return {
    type: 'default',
    latitude: 0,
    longitude: 0,
    country: 'Sconosciuto',
    city: 'Sconosciuta',
    language: 'it',
    theme: 'light'
  };
});
</script>

<template>
  <div>
  <h1>Index page</h1>

  <div v-if="status === 'pending'">Caricamento...</div>

  <div v-else-if="error">Errore: {{ error.message }}</div>

  <ul v-else>
    <li>Type: {{ preferences.type }}</li>
    <li>Paese: {{ preferences.country }}</li>
    <li>Lingua: {{ preferences.language }}</li>
    <li>Città: {{ preferences.city }}</li>
    <li>Latitudine: {{ preferences.latitude }}</li>
    <li>Longitudine: {{ preferences.longitude }}</li>
    <li>Timezone: {{ preferences.timezone }}</li>
    <li>Theme: {{ preferences.theme }}</li>
  </ul> 
</div>
</template>

<style scoped lang="scss">
  li {
    list-style: none;
  }

 .dark {
  background-color: rgba(0, 0, 0, 0.8);

  ul {
    color: #fff;
  }
 }
</style>