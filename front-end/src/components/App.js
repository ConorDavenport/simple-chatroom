import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import './App.css';
import JoinRoom from './components/JoinRoom'
const axios = require('axios')

function time() {
  return (new Date().toLocaleTimeString())
}

// Connect to HTTP server on port 8000
const client = new W3CWebSocket('ws://localhost:8000')

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: null
    }
  }
  componentDidMount() {
    client.onopen = () => {
      console.log(time() + ': Websocket Client Connected')
    }
    client.onmessage = (message) => {
      const data = message.data
      console.log(data)
    }
  }

  render() {
    return (
      <div className="App">
        <JoinRoom 
          uuid={this.state.uuid}
        />
      </div>
    );
  }
}