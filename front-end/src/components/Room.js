import React from 'react'

export default class Room extends React.Component {
  render() {
    const roomCode = window.location.href.match(/\/\w*$/)[0].substring(1)
    return (
      <div>
        {`This is room ${roomCode}`}
      </div>
    )
  }
}