import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import './App.css';

// Connect to HTTP server on port 8000
const client = new W3CWebSocket('ws://localhost:8000')

export default class App extends React.Component {
  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }
    client.onmessage = () => {
      const data = JSON.parse(message.data).utf8Data
      // Do stuff with data
    }
  }
  render() {
    return (
      <div className="App">
      
      </div>
    );
  }
}