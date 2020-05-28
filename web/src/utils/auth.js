const tokenKey = 'token'
export function setToken (token) {
  localStorage.setItem(tokenKey, token)
}
export function removeToken () {
  localStorage.removeItem(tokenKey)
}
