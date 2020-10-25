import React from 'react'
import './App.css';
const axios = require('axios')

class Message extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.data.user}</div>
        <div>{this.props.data.message}</div>
        <div>{this.props.data.date}</div>
        <div>{this.props.data.id}</div>
      </div>
    )
  }
}

export default class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.loadMore()

    this.props.client.onmessage = (message) => {
      var data = JSON.parse(message.data)
      // slice = shallow copy
      let newStateArray = this.state.messages.slice()
      newStateArray.push(data)
      this.setState({ messages: newStateArray })
    }
  }

  loadMore() {
    let leastRecentId
    try {
      leastRecentId = this.state.messages[0].id
    } catch {
      leastRecentId = 0
    }
    axios.get('http://localhost:8000/rooms/messages',
    { params: { leastRecent: leastRecentId}})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  renderFeed() {
    const m = []
    for (let i = 0; i < this.state.messages.length; i++) {
      m.push(<div key={i} className='message'>
          <Message data={this.state.messages[i]} />
        </div>)
    }
    console.log(m)
    return m
  }

  render() {
    console.log('here')
    return (
      <div>
        <div id='feed'>
          {this.renderFeed()}
        </div>
        <button onClick={() => this.loadMore()}>More</button>
      </div>
    )
  }
}