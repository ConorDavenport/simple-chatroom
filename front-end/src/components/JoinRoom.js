import React from 'react';
import { useHistory } from 'react-router-dom'

export default class JoinRoom extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label>{'Name: '}</label>
          <input type="text" id="userName" autoComplete="off" required/>
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
    history.push('/chat-room')
  }

  return (
    <div>
      <button onClick={handleClick}>{'Join'}</button>
    </div>
  );
}