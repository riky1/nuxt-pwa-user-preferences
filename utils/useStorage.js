/**
 * Funzione per gestire localStorage.
 * @param {String} storeName - nome storage.
 * @returns {Object} [getStorage, setStorage]
 */
export function useStorage(storeName) {

  function getStorage() {
    return localStorage.getItem(storeName) || null
  }

  function setStorage(value) {
    localStorage.setItem(storeName, value)
  }

  return {
    getStorage,
    setStorage
  }
}