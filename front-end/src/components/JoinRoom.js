import React from 'react';
import { useHistory } from 'react-router-dom'
const axios = require('axios')

export default class JoinRoom extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label>{'Name: '}</label>
          <input type="text" id="userName" required/>
        </div>
        <div>
          <Submit 
            changeName={this.props.changeName}/>
        </div>
      </div>
    )
  }
}

const Submit = (props) => {
  const history = useHistory();

  const handleClick = () => {
    props.changeName(document.getElementById('userName').value)

    axios.get('http://localhost:8000/rooms/request')
    .then((res) => {
      console.log('Entering Room')
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    history.push('/rooms/chat')
  }

  return (
    <div>
      <button onClick={handleClick}>{'Join'}</button>
    </div>
  );
}