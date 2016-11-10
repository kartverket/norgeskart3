angular.module('mainMenuIframe')
    .directive('mainMenuIframe', [
        function() {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuIframe/mainMenuIframe.html',
                controller: 'mainMenuIframeController',
                restrict: 'A',
                link: function(){
                }
            };
        }]);