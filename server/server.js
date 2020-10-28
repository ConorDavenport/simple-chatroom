const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
const Messages = require('./models/Messages')
require('dotenv/config')

function time() {
  return (new Date().toLocaleTimeString())
}

//------------------------------------//
//      SERVER INITIALISATION         //
//------------------------------------//
const PORT = process.env.port || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()) // allow api calls from any ip

// import routes
const roomsRoutes = require('./routes/rooms')
const { parse } = require('path')

app.use('/rooms', roomsRoutes)

const server = http.createServer(app)

//------------------------------------//
//      WEBSOCKET INTIALISATION       //
//------------------------------------//
const wss = new WebSocket.Server({ server })
// wss = websocket server, represents the backend
// ws = websocket, represents the frontend

wss.on('connection', (ws) => {
  console.log(`${time()}: Client Connected`)
  //------ EVENT HANDLERS ------
  // broadcast incoming message to all clients
  ws.on('message', (message) => {
    // incoming messages are strings
    const msg = JSON.parse(message)
    console.log(`${time()}: ${message}`)
    // save new message to database
    new Messages({
      user: msg.user,
      message: msg.message,
      date: Date.now(),
    }).save()
    .then((m) => {
      // append the database entry id to the message
      const messageID = m._id
      let parsedMessage = JSON.parse(message)
      parsedMessage.id = messageID
      parsedMessage.date = Date.now()
      message = JSON.stringify(parsedMessage)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  })
  ws.on('close', () => {
    console.log(`${time()}: Client Disconnected`)
  })  
})

server.listen(PORT, () => {
  console.log(`Server started listening on port ${server.address().port}`)
})

//------------------------------------//
//      DATABASE INITIALISATION       //
//------------------------------------//
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { 
    console.log('Connected to Database')
    // clear database on server restart
    // this is just for test purposes
    Messages.deleteMany({}).catch((err) => console.log(err))
  }  
)