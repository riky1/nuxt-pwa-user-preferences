/**
 * Composable per gestire IndexdDB.
 */

export const useIDB = (dbName, storeName) => {
  
  let db

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
        await deleteIDB()
        reject(`Errore durante l'apertura del database ${event.target.errorCode}`)
      }

    })
  }

  const getIDBValue = (key) => {
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

  const setIDBValue = async (key, value) => {
    try {
      await openDB()

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      store.put({ id: key, value })
    } catch (error) {
      console.log(`Errore durante il salvataggio in IndexedDB: ${error}`)
    }
  }

  const deleteIDB = () => {
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

  return {
    getIDBValue,
    setIDBValue
  }
}