import axios from "axios";
import Auth from "./auth.js";

const methods = Object.freeze({
    GET: 1,
    PUT: 2,
    POST: 3
});

class Req {

    constructor() {
        this.auth = new Auth();
        this.apiKey = "02Ne8zVYY4alpUaYomOi79UdvILdSWVd3orvO6f0";
    }

    get(url, conf) {
        return this._fire(methods.GET, url, undefined, conf);
    }

    post(url, params, conf) {
        return this._fire(methods.POST, url, params, conf);
    }

    put(url, params, conf) {
        return this._fire(methods.PUT, url, params, conf);
    }

    _fire(method, url, params, conf) {
        return new Promise((resolve, reject) => {
            this._request(method, url, params, conf)
                .then(res => resolve(res))
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        console.log("Got 401 during request. Trying to refresh access token...");
                        this.auth.refreshTokenAsync()
                            .then(() => {
                                console.log("Successfully refreshed token");
                                this._request(method, url, params, conf)
                                    .then(res => resolve(res))
                                    .catch(err => reject(err));
                            })
                            .catch(err => reject(err));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    _request(method, url, params, conf) {
        if (!conf) conf = {headers: {}};
        conf.headers = Object.assign(conf.headers, this._getHeaders());

        switch(method) {
        case methods.GET:
            return axios.get(url, conf);
        case methods.PUT:
            return axios.put(url, params, conf);
        case methods.POST:
            return axios.post(url, params, conf);
        default:
            throw new Error("Unknown method: ", method);
        }
    }

    _getHeaders() {
        return {
            "Authorization": "Bearer " + this.auth.getIdToken(),
            "x-api-key": this.apiKey
        };
    }
}

export default Req;
