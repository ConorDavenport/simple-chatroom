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
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/:room' component={Room} />
          </Switch>
        </div>
      </Router>
    );
  }
}