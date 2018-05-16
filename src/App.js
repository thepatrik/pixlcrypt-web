import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">pixlcrypt</h1>
        </header>
        <p className="App-intro">
          <a href={"https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=542fu8i4nfb4eckn95j4uek1m6&redirect_uri=" + (window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')) + "/callback.html"}>login</a>
        </p>
      </div>
    );
  }
}

export default App;
