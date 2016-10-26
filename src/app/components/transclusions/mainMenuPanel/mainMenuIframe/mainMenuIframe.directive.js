angular.module('mainMenuIframe')
    .directive('mainMenuIframe', [ '$location',
        function($location) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuIframe/mainMenuIframe.html',
                restrict: 'A',
                link: function(scope){
                    var getUrl = function () {
                        return $location.absUrl();
                    };

                    scope.addMarker= function () {
                        scope.marker= scope.useMarker ? scope.activePosition : undefined;
                    };

                    scope.getIframe = function () {
                        scope.iframe='<iframe src="' + getUrl() + '&type=1' + '" width="134" height="108" title="" longdesc=""></iframe>';
                    };
                }
            };
        }]);