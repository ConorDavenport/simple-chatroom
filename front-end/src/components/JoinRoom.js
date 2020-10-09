import React from 'react';
import { useHistory } from 'react-router-dom'
const axios = require('axios')

export default class JoinRoom extends React.Component {
   render() {
    return (
      <div>
        <div>
          <label>{'Room Code: '}</label>
          <input type="text" id="roomCode" required/>
        </div>
        <div>
          <label>{'Name: '}</label>
          <input type="text" id="userName" required/>
        </div>
        <div>
          <Submit />
        </div>
      </div>
    )
  }
}


const Submit = () => {
  const history = useHistory();

  const handleClick = () => {
    const roomCode = document.getElementById('roomCode').value
    const userName = document.getElementById('userName').value
    const body = {
      roomCode: roomCode,
      userName: userName
    }
    axios.put('http://localhost:8000/rooms/request', body)
    .then(() => {
      console.log(`Requested Room ${roomCode}`)
    })
    .catch((err) => {
      console.log(err)
    })
    history.push(`/:${roomCode}`)
  }

  return (
    <div>
      <button onClick={handleClick}>{'Submit'}</button>
    </div>
  );
}