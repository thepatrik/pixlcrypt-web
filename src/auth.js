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
        return this.getBaseUri() + "/auth";
    }

    getClientId() {
        return "542fu8i4nfb4eckn95j4uek1m6";
    }

    parseCode() {
        return this._getParameterByName("code");
    }

    requestToken(code, cb) {
        let uri = "https://pixlcrypt.auth.eu-west-1.amazoncognito.com/oauth2/token";
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener("load", res => {
            let data = res.target.response;
            if (typeof data === 'string') data = JSON.parse(data);

            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('id_token', data.id_token);
            if (cb) cb();
        });
        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let params = 'grant_type=authorization_code&client_id=' + this.getClientId() + '&redirect_uri=' + this.getRedirectUri() + '&code=' + (code ? code : this.getCode());
        xhr.send(new URLSearchParams(params));
    }

    _getParameterByName(name, url, decodeUri) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        var res = results[2].replace(/\+/g, " ");
        if (decodeUri) {
            return decodeURIComponent(res);
        }
        return res;
    }
}

export default Auth;
