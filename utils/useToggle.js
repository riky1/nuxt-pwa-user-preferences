/**
 * Funzione per gestire lo stato del toggle.
 * @param {Boolean} initialValue - Valore iniziale del toggle.
 * @returns {Array} [state, toggle] - Lo stato attuale e la funzione toggle.
 */
export function useToggle(initialValue = false) {
  const state = ref(initialValue);
  console.log('state: ', state);

  // Funzione per cambiare lo stato
  function toggle() {
    state.value = !state.value;
  }

  return [state, toggle];
}
