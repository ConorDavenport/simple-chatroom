const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const WebSocket = require('ws')
const User = require('./models/Users')
const Room = require('./models/Rooms')
const cors = require('cors')
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

app.use('/rooms', roomsRoutes)

const server = http.createServer(app)

//------------------------------------//
//      WEBSOCKET INTIALISATION       //
//------------------------------------//
const wss = new WebSocket.Server({ server })
// wss = websocket server, represents the backend
// ws = websocket, represents the frontend

wss.on('connection', (ws) => {
  // when a client connects to the websocket server
  // add that user to the Users database and send
  // the client's uuid to the client
  var id
  const user = new User()
  user.save()
  .then((data) => {
    id = data._id
    console.log(time() + `: ${id} Connected`)
    const initMessage = {
      type: 'setup',
      id: id
    }
    ws.send(JSON.stringify(initMessage))
  })

  //------ EVENT HANDLERS ------
  ws.on('message', (message) => {
    console.log(`${time()}: ${id}: ${message}`)
  })
  
  ws.on('close', () => {
    console.log(time() + `: ${id} Disconnected`)
    User.deleteOne({_id: id})
    .catch((err) => {
      console.log(err)
    })
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
    User.deleteMany({}).catch((err) => console.log(err))
    Room.deleteMany({}).catch((err) => console.log(err))
  }  
)