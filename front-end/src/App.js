import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import './App.css';
const axios = require('axios')

// Connect to HTTP server on port 8000
const client = new W3CWebSocket('ws://localhost:8000')

export default class App extends React.Component {
  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }
    client.onmessage = (message) => {
      const data = message.data
      console.log(data)
    }
  }

  sendRoomCode() {
    const roomCode = document.getElementById('roomCode').value
    this.send(roomCode)
  }

  send(message) {
    
  }

  render() {
    return (
      <div className="App">
        <div>
          {'Room Code: '}
          <input id='roomCode' type='text'></input>
        </div>
        <div>
          <button 
            id='enterRoom'
            onClick={this.sendRoomCode}
          >{'Enter Room'}</button>
        </div>
      </div>
    );
  }
}