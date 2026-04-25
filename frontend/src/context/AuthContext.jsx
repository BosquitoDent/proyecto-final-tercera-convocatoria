import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { CONFIG } from "../config/config"

// Contexto de autenticación
const AuthContext = createContext(null)

// Proveedor: gestiona sesión con localStorage
export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(
    localStorage.getItem(CONFIG.SESSION_KEY) === CONFIG.SESSION_VALUE
  )

  function iniciar() {
    localStorage.setItem(CONFIG.SESSION_KEY, CONFIG.SESSION_VALUE)
    setSesion(true)
  }

  function cerrar() {
    localStorage.removeItem(CONFIG.SESSION_KEY)
    setSesion(false)
  }

  return (
    <AuthContext.Provider value={{ sesion, iniciar, cerrar }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthContext debe usarse dentro de AuthProvider")
  return ctx
}
