const ADMIN_AUTH_KEY = "nextgen_admin_authenticated"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "nextgen2026"

export const loginAdmin = (username: string, password: string): boolean => {
  const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD

  if (isValid) {
    localStorage.setItem(ADMIN_AUTH_KEY, "true")
  }

  return isValid
}

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_AUTH_KEY)
}

export const isAdminAuthenticated = (): boolean => localStorage.getItem(ADMIN_AUTH_KEY) === "true"
