/**
 * Middleware per gestire le preferenze utente.
 */

export default defineNuxtRouteMiddleware(async () => {

  const userPrefs = useStorePreferences() // Inizializza lo store
  const cookie = useCookie('user-prefs') // Sincronizzazione con il cookie
  const { getGeolocation } = useGeolocation()
  const { getIDBValue, setIDBValue } = useIDB('nuxt-app', 'user-preferences')
  const { getBrowserInfo } = useBrowserInfo()

  const savePreferences = async (value, targets = []) => {
    // Aggiorna lo store se specificato
    if (targets.includes('store')) {
      userPrefs.value = value
    }
  
    // Aggiorna i cookie se specificato
    if (targets.includes('cookie')) {
      cookie.value = value
    }
  
    // Aggiorna IndexedDB se specificato
    if (targets.includes('idb') && import.meta.client) {
      await setIDBValue('preferences', JSON.stringify(value))
    }
  }
  

  // Se le preferenze esistono già, esce
  if (userPrefs.value) {
    console.log('userPrefs already exist')

    return savePreferences(userPrefs.value, ['idb'])
  }

  // Recupera le preferenze dai cookie
  if (cookie.value !== undefined) {
    console.log('cookie already exist')

    return savePreferences(cookie.value, ['store', 'idb'])
  }

  // Se !userPrefs & !cookie recupera da IndexedDB
  if (import.meta.client && !userPrefs.value) {
    console.log('Client side')

    const idbPreferences = await getIDBValue('preferences')

    if (idbPreferences) {
      return savePreferences(JSON.parse(idbPreferences), ['store', 'cookie'])
    }
  }

  // Se non ci sono preferenze, chiama l'API di geolocalizzazione
  const { geoloc } = await getGeolocation() || {}

  if (geoloc) {
    console.log('Geolocalizzazione')

    return savePreferences(geoloc, ['store', 'cookie', 'idb'])
  }

  // a questo punto fa la geolocalizzazione lato browser
  if (import.meta.client) {
    console.log('BrowserInfo')

    const browserInfo = await getBrowserInfo(false)

    if (browserInfo) {
      savePreferences(browserInfo, ['store'])
    }

    try {
      const { getBrowserInfo } = useBrowserInfo()
      const geolocationInfo = await getBrowserInfo(true) // Richiede geolocalizzazione
      savePreferences({ ...browserInfo, ...geolocationInfo }, ['store'])
    } catch (error) {
      console.warn('Autorizzazione negata per la geolocalizzazione.')
    }
  }
  
  console.error('Nessuna fonte disponibile per le preferenze utente.')
})