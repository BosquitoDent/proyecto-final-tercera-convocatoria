const { MESSAGES } = require("../config/messages")

// Middleware de errores centralizado
function errorHandler(err, _req, res, _next) {
  // Validación de Mongoose
  if (err.name === "ValidationError") {
    const errores = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ error: errores.join(", ") })
  }

  // ID de MongoDB inválido
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ error: MESSAGES.CANCION.INVALID_ID })
  }

  // Error genérico
  return res.status(500).json({ error: MESSAGES.SERVER_ERROR })
}

module.exports = { errorHandler }
