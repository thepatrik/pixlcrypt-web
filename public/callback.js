(function(exports) {
    "use strict";

    function init() {
        let auth = new Auth();
        let code = auth.parseCode();

        if (code !== undefined) {
            auth.requestToken(code, () => {
                window.location.href = auth.getBaseUri() + "/index.html";
            });
        }
    }

    exports.Callback = {
        init: init
    };

}(window));

(function() {
    "use strict";
    window.addEventListener('load', Callback.init);
}());
