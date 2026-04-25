const API_BASE = import.meta.env.VITE_API_URL

export const CONFIG = {
  SESSION_KEY: "session",
  SESSION_VALUE: "ok",
  TOAST_DURATION: 2000,
}

export const ROUTES = {
  LOGIN: "/login",
  HOME: "/app",
  CANCIONES: "/app/canciones",
  ABOUT: "/app/about",
}

export const ENDPOINTS = {
  CANCIONES: `${API_BASE}/canciones`,
  LOGIN: `${API_BASE}/auth/login`,
}
