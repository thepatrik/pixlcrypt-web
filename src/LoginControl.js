import React, { Component } from 'react';
import Auth from './utilities/auth.js';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        this.state = {isSignedIn: props.isSignedIn};
        this.clientId = new Auth().getClientId();
    }

    render() {
        const isSignedIn = this.state.isSignedIn;
        if (isSignedIn) {
            return (
                <div>
                    <a href={"https://pixlcrypt.auth.eu-west-1.amazoncognito.com/logout?client_id=" + this.clientId + "&logout_uri=" + (window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')) + "/signout"}>Sign out</a>
                </div>
            );
        }
        return (
            <div>
                <a href={"https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=" + this.clientId + "&redirect_uri=" + (window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')) + "/auth"}>Sign in</a>
            </div>
        );
    }
}

export default LoginControl;
