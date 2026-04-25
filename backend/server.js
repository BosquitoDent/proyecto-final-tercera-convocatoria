require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const cancionesRouter = require("./src/routes/canciones")
const { connectDb, disconnectDb } = require("./src/config/db")
const { ROUTES } = require("./src/config/routes")
const { MESSAGES } = require("./src/config/messages")
const { errorHandler } = require("./src/middleware/errorHandler")

const app = express()

app.use(cors())
app.use(express.json())

// Health checks
app.get(ROUTES.HEALTH, (_req, res) => res.status(200).json({ ok: true }))

app.get(ROUTES.DB_HEALTH, async (_req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    return res.status(200).json({ ok: true, collections: collections.map(c => c.name) })
  } catch (err) {
    return res.status(500).json({ ok: false, error: MESSAGES.DB_ERROR })
  }
})

// Login
app.post(ROUTES.AUTH_LOGIN, (req, res) => {
  const { user, pass } = req.body
  if (user === process.env.LOGIN_USER && pass === process.env.LOGIN_PASS) {
    return res.status(200).json({ ok: true, session: "ok" })
  }
  return res.status(401).json({ ok: false, error: MESSAGES.AUTH_INVALID })
})

// Canciones
app.use(ROUTES.CANCIONES, cancionesRouter)

// Servir frontend en producción
const frontendPath = path.join(__dirname, "..", "frontend", "dist")
app.use(express.static(frontendPath))
app.get("*", (_req, res, next) => {
  const fs = require("fs")
  if (fs.existsSync(path.join(frontendPath, "index.html"))) {
    return res.sendFile(path.join(frontendPath, "index.html"))
  }
  next()
})

app.use((_req, res) => res.status(404).json({ error: MESSAGES.NOT_FOUND }))
app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start() {
  await connectDb()
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
  })
}

// Cierre limpio
process.on("SIGINT", async () => {
  await disconnectDb()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await disconnectDb()
  process.exit(0)
})

start()
