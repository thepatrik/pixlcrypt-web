import axios from 'axios';
import Utils from './utils.js';

class Auth {

    constructor() {
        this.authUri = "https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/token";
        this.baseUri = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        this.clientId = "542fu8i4nfb4eckn95j4uek1m6";
        this.redirectUri = this.baseUri + "/auth";
    }

    isSignedIn() {
        return this.getToken() != null && this.getRefreshToken() != null;
    }

    getToken() {
        return localStorage.getItem("access_token");
    }

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    getIdToken() {
        return localStorage.getItem("id_token");
    }

    getBaseUri() {
        return this.baseUri;
    }

    getRedirectUri() {
        return this.redirectUri;
    }

    getClientId() {
        return this.clientId;
    }

    parseCode() {
        return Utils.getParameterByName("code");
    }

    getTokensAsync(code) {
        return new Promise((resolve, reject) => {
            const uri = this.authUri;
            const conf = {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };
            const params = new URLSearchParams('grant_type=authorization_code&client_id=' + this.getClientId() + '&redirect_uri=' + this.getRedirectUri() + '&code=' + (code ? code : this.parseCode()));
            axios.post(uri, params, conf).then(res => {
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('id_token', res.data.id_token);
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default Auth;
