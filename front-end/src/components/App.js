import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';
import Home from './Home'
import Room from './Room'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'User',
      messages: [],
    }
    this.changeName = this.changeName.bind(this)
  }

  changeName(n) {
    this.setState({ name: n })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route 
              exact path='/'
              render={(props) => (
                <Home {...props} 
                  changeName={this.changeName} />
              )} />
            <Route 
              exact path='/chat-room'
              render={(props) => (
                <Room {...props} 
                  name={this.state.name} />
              )} />
          </Switch>
        </div>
      </Router>
    );
  }
}