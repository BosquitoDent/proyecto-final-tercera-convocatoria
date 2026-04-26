import { useState } from "react"
import { TEXTS } from "../config/texts"
import useCanciones from "../hooks/useCanciones"
import Popup from "../components/ui/Popup"
import FormCancion from "../components/canciones/FormCancion"
import FiltrosCanciones from "../components/canciones/FiltrosCanciones"
import TablaCanciones from "../components/canciones/TablaCanciones"

const T = TEXTS.CANCIONES

// Página de canciones: formulario, filtros y tabla
export default function CancionesPage() {
  const { lista, cargando, error, mensaje, enviando, crear, borrar, actualizar, cargar } = useCanciones()

  // Formulario de crear
  const [titulo, setTitulo] = useState("")
  const [artista, setArtista] = useState("")
  const [estadoDeAnimo, setMood] = useState("")

  // Filtros
  const [fTitulo, setFTitulo] = useState("")
  const [fArtista, setFArtista] = useState("")
  const [fMood, setFMood] = useState("")

  // Edición inline
  const [editId, setEditId] = useState(null)
  const [editTitulo, setEditTitulo] = useState("")
  const [editArtista, setEditArtista] = useState("")
  const [editMood, setEditMood] = useState("")

  const filtrosActuales = { titulo: fTitulo, artista: fArtista, estadoDeAnimo: fMood }

  async function handleCrear(e) {
    e.preventDefault()
    if (!titulo || !artista) return
    const ok = await crear({ titulo, artista, estadoDeAnimo }, filtrosActuales)
    // Si se creó, limpiamos el formulario
    if (ok) {
      setTitulo("")
      setArtista("")
      setMood("")
    }
  }

  function empezarEditar(c) {
    setEditId(c._id)
    setEditTitulo(c.titulo)
    setEditArtista(c.artista)
    setEditMood(c.estadoDeAnimo || "")
  }

  async function guardarEdicion(id) {
    if (!editTitulo || !editArtista) return
    const ok = await actualizar(id, {
      titulo: editTitulo,
      artista: editArtista,
      estadoDeAnimo: editMood || null
    }, filtrosActuales)
    if (ok) cancelarEdicion()
  }

  function cancelarEdicion() {
    setEditId(null)
    setEditTitulo("")
    setEditArtista("")
    setEditMood("")
  }

  function aplicarFiltros(e) {
    e.preventDefault()
    cargar(filtrosActuales)
  }

  return (
    <>
      <Popup message={mensaje} />

      <FormCancion
        titulo={titulo} artista={artista} estadoDeAnimo={estadoDeAnimo} enviando={enviando}
        onTitulo={setTitulo} onArtista={setArtista} onMood={setMood} onSubmit={handleCrear}
      />

      <section className="card">
        <div className="section-title">{T.SEARCH_TITLE}</div>
        <FiltrosCanciones
          fTitulo={fTitulo} fArtista={fArtista} fMood={fMood}
          onTitulo={setFTitulo} onArtista={setFArtista} onMood={setFMood} onSubmit={aplicarFiltros}
        />
        <div className="divider" />

        {cargando && <div className="help">{T.LOADING}</div>}
        {error && <div className="help" style={{ color: "#ff9b9b" }}>{error}</div>}
        {mensaje && <div className="help" style={{ color: "#7df0c0" }}>{mensaje}</div>}
        {!cargando && lista.length === 0 && <div className="help">{T.EMPTY}</div>}

        <TablaCanciones
          lista={lista} editId={editId} editTitulo={editTitulo} editArtista={editArtista}
          editMood={editMood} enviando={enviando}
          onEditTitulo={setEditTitulo} onEditArtista={setEditArtista} onEditMood={setEditMood}
          onEditar={empezarEditar} onGuardar={guardarEdicion} onCancelar={cancelarEdicion}
          onBorrar={(id) => borrar(id, filtrosActuales)}
        />
      </section>
    </>
  )
}
