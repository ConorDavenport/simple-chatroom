import React from 'react';
import './JoinRoom.css'
const axios = require('axios')

export default class JoinRoom extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    const roomCode = event.target[0].value
    const userName = event.target[1].value
    const body = {
      roomCode: roomCode,
      userName: userName
    }
    axios.put('http://localhost:8000/', body)
    .then(() => {
      console.log('Requested Room')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <form id="joinRoomForm" onSubmit={this.handleSubmit}> 
        <div>
          <label>{'Room Code: '}</label>
          <input type="text" name="roomcode" required/>
        </div>
        <div>
          <label>{'Name: '}</label>
          <input type="text" name="userName" required/>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}