<script setup>
useHead({
  link: [
    {
       rel: 'stylesheet',
       href: './_root-light.css' 
    } 
  ]
})
</script>

<template>
  <NuxtPwaManifest />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>

</style>
