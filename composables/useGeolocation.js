export function useGeolocation() {

  const geoloc = ref(null)
  const position = ref(null)
  const error = ref(null)

  const getGeolocation = async () => {

    try {      

      // Tenta prima con l'API del server (MapTiler)
      const response = await $fetch('/api/geolocation')

      if (response && response.geoloc) {
        geoloc.value = response.geoloc
        console.log('Geolocalizzazione trovata tramite MapTiler:', response.geoloc)
        return { geoloc: response.geoloc } // Restituisci un oggetto con `geoloc`
      }

      // Se l'API del server fallisce o non restituisce nulla, usa il browser
      if (import.meta.client) {
        const browserPosition = await getBrowserGeolocation()
        return { geoloc: null, position: browserPosition }
      }

    } catch (err) {

      console.error('Errore durante la geolocalizzazione:', err)
      error.value = 'Errore durante la geolocalizzazione'

      if (import.meta.client) {
        const browserPosition = await getBrowserGeolocation()
        return { geoloc: null, position: browserPosition }
      }
    }

    return { geoloc: null, position: null } // Fallback finale se tutto fallisce
  }

  const getBrowserGeolocation = () => {

    return new Promise((resolve, reject) => {
      
      if (!navigator.geolocation) {
        error.value = 'Geolocalizzazione non supportata dal browser'
        reject('Geolocalizzazione non supportata dal browser')
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          position.value = { latitude, longitude }

          console.log('Geolocalizzazione trovata tramite browser:', latitude, longitude)
          resolve(position.value)
        },
        (err) => {
          error.value = 'Errore nella geolocalizzazione del browser'
          console.error('Errore nella geolocalizzazione del browser:', err)
          reject(err)
        }
      )
    })
  }

  return {
    geoloc,
    position,
    error,
    getGeolocation,
  }
}
