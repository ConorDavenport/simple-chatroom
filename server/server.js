const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
require('dotenv/config')

//------------------------------------//
//      SERVER INITIALISATION         //
//------------------------------------//
const PORT = process.env.port || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()) // allow api calls from any ip

// import routes
const roomsRoutes = require('./routes/rooms')
app.use('/', roomsRoutes)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received Message')
    ws.send(`Echo ${message}`)
  })
  ws.send('Hello Client')
  console.log('Client Connected')
})

server.listen(PORT, () => {
  console.log(`Server started listening on port ${server.address().port}`)
})

//------------------------------------//
//      DATABASE INITIALISATION       //
//------------------------------------//
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('Connected to Database') }  
)


// const clients = new Map()

// function getUniqueID() {
//   const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//   return s4() + s4() + '-' + s4();
// }