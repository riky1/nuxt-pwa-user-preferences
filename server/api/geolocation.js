/**
 * API per geolocalizzazione.
 */

export default defineEventHandler(async (event) => {
  const { MAPTILER_GEOLOC_API_BASEURL, MAPTILER_API_KEY } = useRuntimeConfig()

  const url = `${MAPTILER_GEOLOC_API_BASEURL}?key=${MAPTILER_API_KEY}`

  const response = await fetch(url)
  const data = await response.json()

  return {
    geoloc: data
  }
})