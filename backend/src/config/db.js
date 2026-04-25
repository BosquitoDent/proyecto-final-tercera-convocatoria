const mongoose = require("mongoose")

const url = process.env.MONGODB_URL
const dbName = process.env.DB_NAME

async function connectDb() {
  console.log("Conectando a MongoDB...", url ? "URL ok" : "URL no definida")
  await mongoose.connect(url, { dbName })
  console.log("Conectado a MongoDB")
}

async function disconnectDb() {
  await mongoose.disconnect()
}

module.exports = { connectDb, disconnectDb }
