angular.module('menuShareMap')
    .controller('menuShareMapController',[ '$location', '$scope','$window','ISY.EventHandler',
        function($location, $scope, $window, eventHandler){

            var getUrl = function () {
                return $location.absUrl();
            };

            var getEncodedUrl = function () {
                return encodeURIComponent(getUrl());
            };

            $scope.getMailUrl = function () {
                var url='mailto:?subject=norgeskart.no&body=' + getEncodedUrl();
                $window.open(url, '_self');
            };

            $scope.getTwitterUrl = function () {
                var url='http://twitter.com/share?url=' + getEncodedUrl();
                $window.open(url, '_blank');
            };

            $scope.getFacebookUrl = function () {
                var url='http://www.facebook.com/sharer.php?u=' + getEncodedUrl();
                $window.open(url, '_blank');
            };

            $scope.getIframe = function () {
                var url=getUrl() + '&type=1';
                if ($scope.useMarker){
                    url+='&marker_lat=' + $scope.activePosition.lat + '&marker_lon=' + $scope.activePosition.lon;
                }
                $scope.iframe='<iframe src="' + url + '" width="134" height="108"';
                if( $scope.shortDescription){
                    $scope.iframe+=' title="' + $scope.shortDescription + '"';
                }
                if($scope.longDescription){
                    $scope.iframe+=' longdesc="' + $scope.longDescription + '"';
                }
                $scope.iframe+= '></iframe>';
                setTimeout(function(){
                    $scope.$apply();
                },10);
            };

            $scope.getAbsoluteUrl = function () {
                return getUrl();
            };

            $scope.copyURL = function () {
                // standard way of copying
                var textArea = document.createElement('textarea');
                textArea.setAttribute
                ('style','width:1px;border:0;opacity:0;');
                document.body.appendChild(textArea);
                textArea.value = getUrl();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            };

            $scope.copyIFrame = function () {
                var textArea = document.createElement('textarea');
                textArea.setAttribute
                ('style','width:1px;border:0;opacity:0;');
                document.body.appendChild(textArea);
                textArea.value = $scope.iframe;
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            };

            eventHandler.RegisterEvent(ISY.Events.EventTypes.MapMoveend, $scope.getIframe);
            $scope.iframe="";
            $scope.getIframe();


        }
    ]);