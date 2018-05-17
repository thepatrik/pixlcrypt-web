import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControl from './LoginControl.js';
import Auth from './auth.js';

class App extends Component {

  render() {
    let auth = new Auth();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">pixlcrypt</h1>
        </header>
          <br/>
          <LoginControl isSignedIn={auth.isSignedIn()} className="App-intro"/>
      </div>
    );
  }
}

export default App;
