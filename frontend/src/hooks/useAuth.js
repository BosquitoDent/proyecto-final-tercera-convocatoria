import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api"
import { useAuthContext } from "../context/AuthContext"
import { ROUTES } from "../config/config"
import { TEXTS } from "../config/texts"

// Hook para gestionar login y logout
export default function useAuth() {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const nav = useNavigate()
  const { iniciar, cerrar } = useAuthContext()

  async function iniciarSesion(email, pass) {
    setError("")
    if (!email || !pass) {
      setError(TEXTS.LOGIN.ERROR_EMPTY)
      return
    }
    try {
      setCargando(true)
      await login({ user: email, pass })
      iniciar()
      nav(ROUTES.HOME)
    } catch (e) {
      setError(TEXTS.LOGIN.ERROR_INVALID)
    } finally {
      setCargando(false)
    }
  }

  function cerrarSesion() {
    cerrar()
    nav(ROUTES.LOGIN)
  }

  return { cargando, error, iniciarSesion, cerrarSesion }
}
