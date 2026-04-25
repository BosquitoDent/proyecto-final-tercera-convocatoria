import { ENDPOINTS } from "../config/config"

// Servicio de llamadas a la API

export async function getCanciones(filtros = {}) {
  const params = new URLSearchParams()
  if (filtros.titulo) params.set("titulo", filtros.titulo)
  if (filtros.artista) params.set("artista", filtros.artista)
  if (filtros.estadoDeAnimo) params.set("mood", filtros.estadoDeAnimo)
  const url = `${ENDPOINTS.CANCIONES}${params.toString() ? "?" + params.toString() : ""}`
  const r = await fetch(url)
  return await r.json()
}

export async function crearCancion(data) {
  const r = await fetch(ENDPOINTS.CANCIONES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return await r.json()
}

export async function borrarCancion(id) {
  const r = await fetch(`${ENDPOINTS.CANCIONES}/${id}`, { method: "DELETE" })
  return await r.json()
}

export async function actualizarCancion(id, data) {
  const r = await fetch(`${ENDPOINTS.CANCIONES}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return await r.json()
}

export async function login({ user, pass }) {
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  })
  if (!res.ok) throw new Error("Credenciales inválidas")
  return await res.json()
}
