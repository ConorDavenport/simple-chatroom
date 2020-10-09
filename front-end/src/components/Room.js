import React from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

var client, roomCode, id
   
export default class Room extends React.Component {
  componentDidMount() {
    client = new W3CWebSocket('ws://localhost:8000')
    client.onopen = () => {
      console.log('WebSocket Connected')
    }
    client.onmessage = (message) => {
      var data = message.data
      try {
        data = JSON.parse(data)
        if (data.type === 'setup') {
          id = data.id
          client.send({
            type: 'setup'
          })
        }
      } catch {
        console.log(data)
      }
    }
  }

  handleClick() {
    const message = document.getElementById('message').value
    client.send(message)
  }

  render() {
    roomCode = window.location.href.match(/\/:\w*$/)[0].substring(2)
    return (
      <div>
        <div>{`This is room ${roomCode}`}</div>
        <div>
          <input type='text' id='message'/>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    )
  }
}