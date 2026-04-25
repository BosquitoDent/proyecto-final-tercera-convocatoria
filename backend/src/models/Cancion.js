const mongoose = require("mongoose")

// Schema de canción
const cancionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio"],
    minlength: [1, "El título no puede estar vacío"],
    trim: true // Quita espacios al inicio y final
  },
  artista: {
    type: String,
    required: [true, "El artista es obligatorio"],
    minlength: [1, "El artista no puede estar vacío"],
    trim: true
  },
  estadoDeAnimo: {
    type: String,
    default: null,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
})

const Cancion = mongoose.model("Cancion", cancionSchema, "canciones")

module.exports = Cancion
