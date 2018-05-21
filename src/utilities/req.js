'use strict';
import axios from 'axios'
import Auth from './auth.js';

class Req {

    constructor() {
        this.auth = new Auth();
    }

    get(url) {
        return new Promise((resolve, reject) => {
            const token = this.auth.getToken();
            const headers = {
                'Authorization': 'Bearer ' + token,
                'x-api-key': apiKey
            };
            axios.get(url, headers)
            .then(res => resolve(res))
            .catch(err => {
                if (err.response.status === 404) {
                    return axios.get(url, headers);
                }
                reject(err);
            });
        });
    }
}

export default Req;
