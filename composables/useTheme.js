export function useTheme() {
  const isDark = ref(useDark()) // Stato globale condiviso per il tema
  const cookie = useCookie('dark-mode') // Sincronizzazione con il cookie

  // Funzione per applicare il tema (aggiorna il CSS)
  const applyTheme = () => {
    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: () => (isDark.value ? './_root-dark.css' : './_root-light.css')
        },
      ],
    })
  }

  // Alterna il tema
  const toggleTheme = () => {
    isDark.value = !isDark.value // Aggiorna lo stato globale
    cookie.value = isDark.value // Sincronizza con il cookie
    applyTheme() // Aggiorna il CSS
  }

  // Aggiorna il tema quando cambia la preferenza del sistema operativo
  const updateThemeFromSystem = (event) => {
    isDark.value = event.matches
    applyTheme()
  }

  // Inizializzazione del tema  
  const initTheme = () => {
    if (cookie.value !== undefined) {
      isDark.value = cookie.value // Carica il tema dal cookie
      
    } else if (import.meta.client) {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      onMounted(() => {
        isDark.value = darkModeMediaQuery.matches // Imposta il tema in base al sistema operativo
      })      
      
      darkModeMediaQuery.addEventListener('change', updateThemeFromSystem)

      // Pulisce il listener quando il componente viene smontato
      onUnmounted(() => {
        darkModeMediaQuery.removeEventListener('change', updateThemeFromSystem)
      })
    }

    applyTheme()
  }

  // Applica il tema iniziale
  initTheme()

  return {
    isDark,
    toggleTheme
  }
}
