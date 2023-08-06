const express = require('express')
const http = require('http')
const cors = require('cors')
const { configureSocket } = require('./socket')
const { initializeDatabase, db } = require('./database')

initializeDatabase()
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
const server = http.createServer(app)
const io = configureSocket(server, db)
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
