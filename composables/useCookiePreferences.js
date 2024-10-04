export const useCookiePreferences = () => {

  const cookieName = 'userPreferences'
  const userPreferencesCookie = useCookie(cookieName)
  
  const getCookiePreferences = () => {    
    return userPreferencesCookie.value ? userPreferencesCookie.value : null
  }

  const setCookiePreferences = (preferences) => {
    userPreferencesCookie.value = JSON.stringify(preferences)
  }

  return {
    getCookiePreferences,
    setCookiePreferences
  }
}