const MESSAGES = {
  DB_ERROR: "No se pudo conectar a MongoDB",
  DB_CONNECTED: "Conectado a MongoDB",
  DB_DISCONNECTED: "Desconectado de MongoDB",
  SERVER_ERROR: "Error interno del servidor",
  AUTH_INVALID: "Credenciales inválidas",
  NOT_FOUND: "Ruta no encontrada",
  CANCION: {
    REQUIRED: "Los campos 'titulo' y 'artista' son obligatorios",
    INVALID_ID: "ID no válido",
    NOT_FOUND: "No existe esa canción",
    READ_ERROR: "No se pudo leer canciones",
    READ_ONE_ERROR: "No se pudo leer la canción",
    CREATED: "Canción creada",
    UPDATED: "Canción actualizada",
    DELETED: "Canción eliminada",
    UPDATE_ERROR: "No se pudo actualizar la canción",
    DELETE_ERROR: "No se pudo eliminar la canción",
  },
}

module.exports = { MESSAGES }
