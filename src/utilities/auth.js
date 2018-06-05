import axios from "axios";
import * as jwt_decode from "jwt-decode";
import Utils from "./utils.js";

const refreshTokenKey = "refresh_token";
const accessTokenKey = "access_token";
const idTokenKey = "id_token";

class Auth {

    constructor() {
        this.authUri = "https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/token";
        this.baseUri = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
        this.clientId = "542fu8i4nfb4eckn95j4uek1m6";
        this.redirectUri = this.baseUri + "/auth";
    }

    isSignedIn() {
        return this.getIdToken() != null && this.getRefreshToken() != null;
    }

    getToken() {
        return localStorage.getItem(accessTokenKey);
    }

    getRefreshToken() {
        return localStorage.getItem(refreshTokenKey);
    }

    getIdToken() {
        return localStorage.getItem(idTokenKey);
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

    getPayload() {
        let token = this.getIdToken();
        return jwt_decode(token);
    }

    getEmail() {
        let payload = this.getPayload();
        return payload.email;
    }

    parseCode() {
        return Utils.getParameterByName("code");
    }

    clearTokens() {
        localStorage.removeItem(idTokenKey);
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }

    refreshTokenAsync() {
        return new Promise((resolve, reject) => {
            const uri = this.authUri;
            const conf = {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };
            const params = new URLSearchParams("grant_type=refresh_token&refresh_token=" + this.getRefreshToken() + "&client_id=" + this.getClientId());
            axios.post(uri, params, conf).then(res => {
                this._setTokenData(res.data);
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    getTokensAsync(code) {
        return new Promise((resolve, reject) => {
            const uri = this.authUri;
            const conf = {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };
            const params = new URLSearchParams("grant_type=authorization_code&client_id=" + this.getClientId() + "&redirect_uri=" + this.getRedirectUri() + "&code=" + (code ? code : this.parseCode()));
            axios.post(uri, params, conf).then(res => {
                this._setTokenData(res.data);
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    _setTokenData(data) {
        if (data.hasOwnProperty(refreshTokenKey)) localStorage.setItem(refreshTokenKey, data.refresh_token);
        if (data.hasOwnProperty(accessTokenKey)) localStorage.setItem(accessTokenKey, data.access_token);
        if (data.hasOwnProperty(idTokenKey)) localStorage.setItem(idTokenKey, data.id_token);
    }
}

export default Auth;
