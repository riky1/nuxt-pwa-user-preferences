/**
 * Composable per ottenere informazioni lato browser senza usare la geolocalizzazione.
 * Include: lingua, timezone, e paese (basato su `navigator.language`).
 * 
 * "country_code":"IT",
 * "country":"Italy",
 * "country_bounds":[6.626996,36.649555,18.52039,47.092046],
 * "country_languages":["it"],
 * "continent":"Europe",
 * "continent_code":"EU",
 * "eu":true,
 * "city":"Rome",
 * "latitude":41.8904,
 * "longitude":12.5126,
 * "postal":"00144",
 * "region":"Lazio",
 * "region_code":"62",
 * "timezone":"Europe/Rome"
 */

export function useBrowserInfo() {
  // Lingua preferita dell'utente
  const getLanguage = () => {
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language // Restituisce la lingua preferita dell'utente (es. "it-IT")
    }
    return 'en-US' // Fallback
  }

  // Codice del paese basato sulla lingua
  const getCountryCode = () => {
    const language = getLanguage()
    const countryCode = language.split('-')[1]
    return countryCode ? countryCode.toUpperCase() : 'US' // Fallback
  }

  // Timezone dell'utente
  const getTimezone = () => {
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone // Restituisce la timezone
    }
    return 'UTC' // Fallback
  }

  // Richiede esplicitamente la geolocalizzazione
  const requestGeolocation = async () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            resolve({ latitude, longitude })
          },
          (error) => {
            console.error('Errore nella geolocalizzazione:', error)
            reject({ latitude: null, longitude: null }) // Fallback in caso di errore
          }
        )
      })
    }
    // Fallback se `navigator.geolocation` non è disponibile
    return { latitude: null, longitude: null }
  }

  // Restituisce un oggetto JSON con le informazioni disponibili
  const getBrowserInfo = async (includeGeolocation = false) => {
    const geolocation = includeGeolocation ? await requestGeolocation() : { latitude: null, longitude: null }

    return {
      country_language: getLanguage(), // Lingua principale
      country_code: getCountryCode(),
      timezone: getTimezone(), // Timezone
      latitude: geolocation.latitude, // Latitudine
      longitude: geolocation.longitude, // Longitudine
    }
  }

  return {
    getBrowserInfo,
    requestGeolocation,
  }
}

