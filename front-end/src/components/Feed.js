import React from 'react'
const axios = require('axios')

export default class Feed extends React.Component {
  componentDidMount() {
    this.loadMore(0)
  }

  loadMore(n) {
    axios.get('http://localhost:8000/rooms/messages',
    { params: { recent: n }})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div id='feed'>
        <button onClick={this.loadMore}>More</button>
      </div>
    )
  }
}