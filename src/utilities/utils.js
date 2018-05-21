class Utils {

    static getParameterByName(name, url, decodeUri) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");// eslint-disable-line no-useless-escape
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

export default Utils;
