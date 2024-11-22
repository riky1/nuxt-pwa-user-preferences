const isOpen = ref(false)
const content = shallowRef(null)

const toggleBodyScroll = (shouldBlock) => {
  const body = document.body
  
  if (shouldBlock) {
    body.style.overflow = 'hidden' // Blocca lo scroll
  } else {
    body.style.overflow = '' // Ripristina lo scroll
  }
}

export function usePanel() {
  const openPanel = (component) => {
    content.value = component // Imposta il contenuto del modal
    isOpen.value = true
  }

  const closePanel = () => {
    isOpen.value = false
    content.value = null // Resetta il contenuto
  }

  const togglePanel = (component) => {
    if (isOpen.value) {
      closePanel()
    } else {
      openPanel(component)
    }
  }

  watch(isOpen, (newValue) => {
    toggleBodyScroll(newValue)
  })

  return {
    isOpen,
    content,
    openPanel,
    closePanel,
    togglePanel
  }
}