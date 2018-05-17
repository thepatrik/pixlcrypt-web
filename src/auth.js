class Auth {

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
        return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    getRedirectUri() {
        return this.getBaseUri() + "/callback.html";
    }

    getClientId() {
        return "542fu8i4nfb4eckn95j4uek1m6";
    }
}

export default Auth;
