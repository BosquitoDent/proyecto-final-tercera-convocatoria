const Cancion = require("../models/Cancion")
const { MESSAGES } = require("../config/messages")

const M = MESSAGES.CANCION

// Listar canciones con filtros opcionales
async function listar(req, res, next) {
  try {
    const { titulo, artista, mood, desde, hasta } = req.query

    const query = {}
    if (titulo) query.titulo = { $regex: titulo, $options: "i" }
    if (artista) query.artista = { $regex: artista, $options: "i" }
    if (mood) query.estadoDeAnimo = mood
    if (desde || hasta) {
      query.fecha = {}
      if (desde) query.fecha.$gte = new Date(desde)
      if (hasta) query.fecha.$lte = new Date(hasta)
    }

    const docs = await Cancion.find(query).sort({ fecha: -1 })
    return res.status(200).json(docs)
  } catch (err) {
    next(err)
  }
}

async function obtener(req, res, next) {
  try {
    const doc = await Cancion.findById(req.params.id)
    if (!doc) return res.status(404).json({ error: M.NOT_FOUND })
    return res.status(200).json(doc)
  } catch (err) {
    next(err)
  }
}

// Crear canción
async function crear(req, res, next) {
  try {
    const { titulo, artista, estadoDeAnimo, fecha } = req.body || {}

    const doc = new Cancion({
      titulo,
      artista,
      estadoDeAnimo: estadoDeAnimo ?? null,
      fecha: fecha ? new Date(fecha) : new Date()
    })

    const creado = await doc.save()
    return res.status(201).json({ message: M.CREATED, data: creado })
  } catch (err) {
    next(err)
  }
}

// PUT: reemplazar todos los campos
async function actualizar(req, res, next) {
  try {
    const { titulo, artista, estadoDeAnimo, fecha } = req.body || {}

    const actualizado = await Cancion.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        artista,
        estadoDeAnimo: estadoDeAnimo ?? null,
        fecha: fecha ? new Date(fecha) : new Date()
      },
      { new: true, runValidators: true }
    )

    if (!actualizado) return res.status(404).json({ error: M.NOT_FOUND })
    return res.status(200).json({ message: M.UPDATED, data: actualizado })
  } catch (err) {
    next(err)
  }
}

// PATCH: actualizar campos parciales
async function actualizarParcial(req, res, next) {
  try {
    const campos = {}
    const { titulo, artista, estadoDeAnimo, fecha } = req.body || {}
    if (titulo !== undefined) campos.titulo = titulo
    if (artista !== undefined) campos.artista = artista
    if (estadoDeAnimo !== undefined) campos.estadoDeAnimo = estadoDeAnimo
    if (fecha !== undefined) campos.fecha = new Date(fecha)

    const actualizado = await Cancion.findByIdAndUpdate(
      req.params.id,
      campos,
      { new: true, runValidators: true }
    )

    if (!actualizado) return res.status(404).json({ error: M.NOT_FOUND })
    return res.status(200).json({ message: M.UPDATED, data: actualizado })
  } catch (err) {
    next(err)
  }
}

async function eliminar(req, res, next) {
  try {
    const eliminado = await Cancion.findByIdAndDelete(req.params.id)
    if (!eliminado) return res.status(404).json({ error: M.NOT_FOUND })
    return res.status(200).json({ message: M.DELETED })
  } catch (err) {
    next(err)
  }
}

module.exports = { listar, obtener, crear, actualizar, actualizarParcial, eliminar }
