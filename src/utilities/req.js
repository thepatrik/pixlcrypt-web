import axios from "axios";
import Auth from "./auth.js";

class Req {

    constructor() {
        this.auth = new Auth();
        this.apiKey = "02Ne8zVYY4alpUaYomOi79UdvILdSWVd3orvO6f0";
    }

    get(url) {
        return new Promise((resolve, reject) => {
            let conf = {headers: this._getHeaders()};
            axios.get(url, conf)
                .then(res => resolve(res))
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        this.auth.refreshTokenAsync().then(() => {
                            let conf = {headers: this._getHeaders()};
                            return axios.get(url, conf);
                        }).catch(err => reject(err));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    post(url, params) {
        return new Promise((resolve, reject) => {
            let conf = {headers: this._getHeaders()};
            axios.post(url, params, conf)
                .then(res => resolve(res))
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        this.auth.refreshTokenAsync().then(() => {
                            conf = {headers: this._getHeaders()};
                            return axios.post(url, params, conf);
                        }).catch(err => reject(err));
                    } else {
                        reject(err);
                    }
                });
        });
    }

    _getHeaders() {
        return {
            "Authorization": "Bearer " + this.auth.getIdToken(),
            "x-api-key": this.apiKey
        };
    }
}

export default Req;
