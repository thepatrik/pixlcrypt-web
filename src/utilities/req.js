import axios from 'axios'
import Auth from './auth.js';

class Req {

    constructor() {
        this.auth = new Auth();
        this.apiKey = "02Ne8zVYY4alpUaYomOi79UdvILdSWVd3orvO6f0";
    }

    get(url) {
        return new Promise((resolve, reject) => {
            const token = this.auth.getIdToken();
            const conf = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'x-api-key': this.apiKey
                }
            };
            axios.get(url, conf)
            .then(res => resolve(res))
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    return axios.get(url, conf);
                }
                reject(err);
            });
        });
    }

    post(url, params) {
        return new Promise((resolve, reject) => {
            const token = this.auth.getIdToken();
            const conf = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'x-api-key': this.apiKey
                }
            };
            axios.post(url, params, conf)
            .then(res => resolve(res))
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    return axios.post(url, params, conf);
                }
                reject(err);
            });
        });
    }
}

export default Req;
