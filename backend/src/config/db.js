const mongoose = require("mongoose")

const url = process.env.MONGODB_URL
const dbName = process.env.DB_NAME

async function connectDb() {
  await mongoose.connect(url, { dbName })
}

async function disconnectDb() {
  await mongoose.disconnect()
}

module.exports = { connectDb, disconnectDb }
