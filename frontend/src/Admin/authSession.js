const tokenKey = 'amu_admin_token'

export function getAdminToken() {
  return window.localStorage.getItem(tokenKey) || ''
}

export function setAdminToken(token) {
  if (!token) return
  window.localStorage.setItem(tokenKey, token)
}

export function clearAdminToken() {
  window.localStorage.removeItem(tokenKey)
}

export function getAuthHeaders() {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
