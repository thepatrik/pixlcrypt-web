import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './utilities/auth.js';

class AuthControl extends Component {

    constructor(props) {
        super(props);
        this.state = {redirect: ""};
    }

    componentWillMount() {
        let auth = new Auth();
        let code = auth.parseCode();

        if (code !== undefined) {
            auth.getTokensAsync(code).then(() => {
                this.setState({redirect: <Redirect to="/" />});
            });
        }
    }

    render() {
        let redirect = this.state.redirect;
        return <div>{redirect}</div>;
    }
}

export default AuthControl;
