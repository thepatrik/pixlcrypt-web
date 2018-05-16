(function(exports) {
    "use strict";

    function init() {
        let auth = new Auth();
        let code = auth.getCode();
        if (code !== undefined) {
            auth.requestToken(code);
        }
        console.log(code);
    }

    exports.Callback = {
        init: init
    };

}(window));

(function() {
    "use strict";
    window.addEventListener('load', Callback.init);
}());
