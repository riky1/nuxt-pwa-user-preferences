export function useTheme() {

  const isDark = useDark()
  const [darkMode, toggleDark] = useToggle(isDark.value)

  const cookie = useCookie('dark-mode')

  const applyTheme = () => {
    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: () => (isDark.value ? './_root-dark.css' : './_root-light.css')
        }
      ]
    })
  }

  const updateTheme = (event) => {
    darkMode.value = event.matches
    isDark.value = darkMode.value
    applyTheme()
  }

  if (cookie && cookie.value !== undefined) {
    darkMode.value = cookie
    isDark.value = darkMode.value
    applyTheme()
  } else if (import.meta.client) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    isDark.value = darkModeMediaQuery.matches
    applyTheme()

    darkModeMediaQuery.addEventListener('change', updateTheme)

    onUnmounted(() => {
      darkModeMediaQuery.removeEventListener('change', updateTheme);
    })
  }

  const toggleTheme = () => {
    darkMode.value = toggleDark()
    isDark.value = darkMode.value
    cookie.value = darkMode.value
    applyTheme()
  }

  onMounted(() => {
    darkMode.value = isDark.value
  })

  return {
    darkMode,
    toggleTheme
  }
}