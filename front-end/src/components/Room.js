import React from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import Feed from './Feed'

var client
   
export default class Room extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    client = new W3CWebSocket('ws://localhost:8000')
    client.onopen = () => {
      console.log('WebSocket Connected')
    }
    client.onmessage = (message) => {
      var data = message.data
      console.log(data)
    }
  }

  handleClick() {
    const message = document.getElementById('message').value
    client.send({
      message: message,
      user: this.props.name
    })
  }

  render() {
    return (
      <div>
        <div>{`Hello ${this.props.name}`}</div>
        <input type='text' id='message'/>
        <button onClick={this.handleClick}>Submit</button>
        <Feed />
      </div>
    )
  }
}