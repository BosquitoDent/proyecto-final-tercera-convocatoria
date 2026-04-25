import { useEffect, useState } from "react"
import { getCanciones, crearCancion, borrarCancion, actualizarCancion } from "../services/api"
import { TEXTS } from "../config/texts"
import { CONFIG } from "../config/config"

const T = TEXTS.CANCIONES

// Hook para el CRUD de canciones
export default function useCanciones() {
  const [lista, setLista] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [enviando, setEnviando] = useState(false)

  // Toast temporal
  function mostrarMensaje(texto) {
    setMensaje(texto)
    setTimeout(() => setMensaje(""), CONFIG.TOAST_DURATION)
  }

  async function cargar(filtros = {}) {
    try {
      setError("")
      setCargando(true)
      const data = await getCanciones(filtros)
      setLista(Array.isArray(data.items) ? data.items : data)
    } catch (e) {
      setError(T.ERR_LOAD)
    } finally {
      setCargando(false)
    }
  }

  async function crear(data, filtrosActuales) {
    try {
      setError("")
      setEnviando(true)
      await crearCancion(data)
      mostrarMensaje(T.MSG_CREATED)
      cargar(filtrosActuales)
      return true
    } catch (e) {
      setError(T.ERR_CREATE)
      return false
    } finally {
      setEnviando(false)
    }
  }

  async function borrar(id, filtrosActuales) {
    try {
      setError("")
      setEnviando(true)
      await borrarCancion(id)
      mostrarMensaje(T.MSG_DELETED)
      cargar(filtrosActuales)
    } catch (e) {
      setError(T.ERR_DELETE)
    } finally {
      setEnviando(false)
    }
  }

  async function actualizar(id, data, filtrosActuales) {
    try {
      setError("")
      setEnviando(true)
      await actualizarCancion(id, data)
      mostrarMensaje(T.MSG_UPDATED)
      cargar(filtrosActuales)
      return true
    } catch (e) {
      setError(T.ERR_UPDATE)
      return false
    } finally {
      setEnviando(false)
    }
  }

  // Carga inicial
  useEffect(() => { cargar() }, [])

  return { lista, cargando, error, mensaje, enviando, cargar, crear, borrar, actualizar }
}
