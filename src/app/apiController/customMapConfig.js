ISY.CustomMapConfig = function(location, $window){

    function getConfigName(){
        return getConfigParameters().config;
    }

    function objectFromQueryString(qs){
        var returnObject = {};
        qs = htmlDescape(qs);
        var params = qs.split('&');
        for(var i in params){
            var param = params[i];
            var kvPair = param.split('=');
            returnObject[kvPair[0]] = kvPair[1];
        }
        return returnObject;
    }

    function htmlDescape(str) {
        return String(str)
            .replace(/&amp;/g, '&');
            //.replace(/"/g, '&quot;')
            //.replace(/'/g, '&#39;')
            //.replace(/</g, '&lt;')
            //.replace(/>/g, '&gt;');
    }

    function getConfigParameters(){
        var params;

        /*
         Query string is used for direct access from url.
         If no parameters are present in the query string a check for a global javascript variable is made.
         The variables are to be set from the Epi server admin GUI.
         */

        if($window.ISY.viewPropertyObject){
            params = objectFromQueryString($window.ISY.viewPropertyObject.url);
        }
        params = $.extend({}, params, angular.copy(location.search()));
        return params;
    }

    return {
        GetConfigName: getConfigName,
        GetConfigParameters: getConfigParameters
    };

};
