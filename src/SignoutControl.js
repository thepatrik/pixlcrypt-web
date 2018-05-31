import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './utilities/auth.js';

class SignoutControl extends Component {

    componentWillMount() {
        let auth = new Auth();
        auth.clearTokens();
    }

    render() {
        return <div>{<Redirect to="/" />}</div>;
    }
}

export default SignoutControl;
