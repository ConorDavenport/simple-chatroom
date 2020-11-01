import React from 'react'
import JoinRoom from './JoinRoom'

export default class Room extends React.Component {
  render() {
    return (
      <div id='home'>
        <JoinRoom 
          changeName={this.props.changeName}/>
      </div>
    )
  }
}