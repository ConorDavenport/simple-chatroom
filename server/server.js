const express = require('express')
const WebSocketServer = require('websocket').server

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

wsServer = new WebSocketServer({
  httpServer:app
})

const clients = new Map()

function getUniqueID() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
}

wsServer.on('request', (request) => {
  const userID = getUniqueID()
  console.log('Connection Request from ' + userID)

  const connection = request.accept(null, request.origin)
  .on('message', (message) => {
    
  })
})