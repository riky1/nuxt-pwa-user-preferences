export const useIDBPreferences = () => {

  let db
  const dbName = 'userPreferencesDB'
  const storeName = 'preferences'

  // apre la connessione a indexedDB
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1)

      // Inizializza lo store se il database è stato appena creato
      request.onupgradeneeded = (event) => {
        db = event.target.result

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' })
        }
      }

      request.onsuccess = (event) => {
        db = event.target.result
        resolve(db)
      }

      request.onerror = async (event) => {
        await deleteDatabase()
        reject(`Errore durante l'apertura del database ${event.target.errorCode}`)
      }
    })
  }

  // Funzione per eliminare il database se c'è un problema
  const deleteDatabase = () => {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(dbName)

      deleteRequest.onsuccess = () => {
        console.log('Database eliminato con successo.')
        resolve()
      }

      deleteRequest.onerror = (event) => {
        reject(`Errore durante l'eliminazione del database: ${event.target.errorCode}`)
      }

      deleteRequest.onblocked = () => {
        console.warn('La cancellazione del database è stata bloccata.')
      }
    })
  }

  // Recupera un elemento dal database
  const getIdbPreferences = (key) => {
    return new Promise(async (resolve, reject) => {
      try {
        await openDB()

        const transaction = db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)
        const request = store.get(key)

        request.onsuccess = (event) => {
          resolve(event.target.result ? event.target.result.value : null)
        }

        request.onerror = (event) => {
          reject(`Errore durante il recupero da IndexedDB: ${event.target.errorCode}`)
        }
      } catch (error) {
        reject (`Errore durante l'apertura di IndexedDB: ${error}`)
      }
    })
  }

  // Aggiunge o aggiorna un elemento nel database
  const setIdbPreferences = async (key, value) => {
    try {
      await openDB()

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      store.put({ id: key, value })
    } catch (error) {
      console.log(`Errore durante il salvataggio in IndexedDB: ${error}`)
    }
  }

  return {
    getIdbPreferences,
    setIdbPreferences
  }
}