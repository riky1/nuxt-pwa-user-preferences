export const useCookies = (cookieName) => {

  const cookie = useCookie(cookieName)
  
  const getCookie = () => {    
    return cookie ? cookie.value : null
  }

  const setCookie = (value) => {
    cookie.value = JSON.stringify(value)
  }

  return {
    getCookie,
    setCookie
  }
}