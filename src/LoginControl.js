import React, { Component } from 'react';

class LoginControl extends Component {

    constructor(props) {
        super(props);
        this.state = {isSignedIn: props.isSignedIn};
    }

    render() {
        const isSignedIn = this.state.isSignedIn;
        if (isSignedIn) {
            return (
                <div>
                    <a href="">log out</a>
                </div>
            );
        }
        return (
            <div>
                <a href={"https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=542fu8i4nfb4eckn95j4uek1m6&redirect_uri=" + (window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')) + "/auth"}>login</a>
            </div>
        );
    }
}

export default LoginControl;
