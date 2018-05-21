import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControl from './LoginControl.js';
import Auth from './utilities/auth.js';
import AuthControl from './AuthControl.js';
import Grid from './Grid.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  render() {
    let auth = new Auth();
    return (
        <Router>
            <div>
                <Route exact path="/"
                render={() => {
                    return (
                        <div className="App">
                            <header className="App-header">
                                <img src={logo} className="App-logo" alt="logo" />
                                <h1 className="App-title">pixlcrypt</h1>
                                <LoginControl isSignedIn={auth.isSignedIn()} className="App-intro"/>
                            </header>
                            <Grid />
                        </div>
                    )
                }}/>
                <Route path="/auth"
                render={() => {
                    return (
                        <AuthControl />
                    )
                }}/>
            </div>
        </Router>
    );
  }
}

export default App;
