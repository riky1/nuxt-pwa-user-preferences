/**
 * Composable per ottenere informazioni sulla geolocalizzazione tramite Maptiler.
 * di seguito i valori dell'API di geolocalizzazione Maptiler:
 * country: 'Italy',
 * country_bounds: [ 6.626996, 36.649555, 18.52039, 47.092046 ],
 * country_languages: [ 'it' ],
 * continent: 'Europe',
 * continent_code: 'EU',
 * eu: true,
 * city: 'Rome',
 * latitude: 41.8904,
 * longitude: 12.5126,
 * postal: '00182',
 * region: 'Lazio',
 * region_code: '62',
 * timezone: 'Europe/Rome'
 */

export function useGeolocation() {

  const geoloc = ref(null)
  const error = ref(null)

  const getGeolocation = async () => {
    try {
      const response = await $fetch('/api/geolocation')

      if (response && response.geoloc) {
        geoloc.value = response.geoloc
        // console.log('Geolocalizzazione trovata tramite MapTiler: ', response.geoloc)

        return { geoloc: response.geoloc } // restituisce un oggetto con geoloc
      }
    } catch (err) {
      console.error('Errore durante la geolocalizzazione: ', err)
      error.value = 'Errore durante la geolocalizzazione'

      return { geoloc: null }
    }
  }

  return {
    geoloc,
    getGeolocation
  }
}