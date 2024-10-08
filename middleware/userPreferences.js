export default defineNuxtRouteMiddleware(async () => {
  
  const userPrefs = useStorePreferences() // Inizializza lo store
  const { getGeolocation } = useGeolocation()

  const { getCookiePreferences, setCookiePreferences } = useCookiePreferences()
  const { getIdbPreferences, setIdbPreferences } = useIDBPreferences()

  // Funzione per impostare le preferenze basate su geolocalizzazione e predefiniti
  const setPreferencesFromGeoloc = (geoloc, position = null) => {
    return {
      type: defaultPreferences.type,
      country: geoloc?.country || defaultPreferences.country,
      language: geoloc?.country_languages || defaultPreferences.language,
      city: geoloc?.city || defaultPreferences.city,
      latitude: geoloc?.latitude || position?.latitude || defaultPreferences.location.latitude,
      longitude: geoloc?.longitude || position?.longitude || defaultPreferences.location.longitude,
      timezone: geoloc?.timezone || defaultPreferences.timezone,
      darkTheme: defaultPreferences.darkTheme,
    }
  }

  // server side
  if (import.meta.server) {
    console.log('Server side')

    // Recupera le preferenze dai cookie
    const cookiePreferences = getCookiePreferences()

    if (cookiePreferences) {
      userPrefs.value = cookiePreferences // Salva nello store
      return
    }

    // Se non ci sono preferenze, chiama l'API di geolocalizzazione
    const { geoloc } = await getGeolocation() || {}
    console.log('SERVER geoloc:', geoloc)

    // si assicura che `geoloc` sia definito
    if (!geoloc) {
      console.error('Geolocalizzazione non trovata lato server.')
      userPrefs.value = defaultPreferences // Usa le preferenze di default come fallback
      return
    }

    // Imposta le preferenze nello store e nei cookie
    userPrefs.value = setPreferencesFromGeoloc(geoloc)
    setCookiePreferences(userPrefs.value)

    return
  }

  // client side
  if (import.meta.client) {
    console.log('Client side')

    // Se le preferenze esistono già e non sono di tipo "default", esci
    if (userPrefs && userPrefs.value.type !== 'default') {
      return
    }

    // Recupera le preferenze da IndexedDB
    const idbPreferences = await getIdbPreferences('preferences')

    if (idbPreferences) {
      userPrefs.value = idbPreferences

      console.log('============ userPrefs: ', userPrefs.value)
    } else {
      // Se non esistono preferenze, chiama l'API di geolocalizzazione o il browser
      const { geoloc, position } = await getGeolocation() || {}
      console.log('Client geoloc:', geoloc)
      console.log('Client position:', position)

      // Se l'API non restituisce `geoloc`, utilizza la posizione del browser
      if (!geoloc && position) {
        userPrefs.value = {
          type: defaultPreferences.type,
          country: defaultPreferences.country, // Imposta un valore predefinito se `country` non è disponibile
          language: defaultPreferences.language,
          city: defaultPreferences.city,
          latitude: position.latitude,
          longitude: position.longitude,
          timezone: defaultPreferences.timezone,
          darkTheme: defaultPreferences.darkTheme,
        }
      } else if (geoloc) {
        userPrefs.value = setPreferencesFromGeoloc(geoloc, position)
      } else {
        // Se non ci sono dati, usa i valori di default
        userPrefs.value = defaultPreferences
      }

      console.log('Client UserPrefs: ', JSON.stringify(userPrefs.value))
      await setIdbPreferences('preferences', JSON.stringify(userPrefs.value))
      setCookiePreferences(userPrefs.value) // Sincronizza le preferenze nei cookie
    }
  }
})
