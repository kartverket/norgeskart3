angular.module('moveableOverlay')
    .controller('moveableOverlayController', ['$scope','moveableOverlayFactory', '$element',
        function($scope, moveableOverlayFactory, $element) {
            if ($element.scope){
                $element = $($element);
            }

            $scope.menuDrawShow = function(){
                $scope.overlay = moveableOverlayFactory.getOverlayById("DrawingMenu");
                var elementMapDiv = document.getElementById('mapDiv');
                if (elementMapDiv !== null){
                    if ($scope.overlay.left + 802 > elementMapDiv.offsetWidth && $scope.overlay.left + 476 > elementMapDiv.offsetWidth){
                        moveableOverlayFactory.setPositionForOverlayByHeaderName("drawing_menu",92, 20);
                        $scope.overlay = moveableOverlayFactory.getOverlayById("DrawingMenu");
                    }
                }
                $scope.header = $scope.overlay.headingTitle;
                $element.css({
                    left: $scope.overlay.left,
                    top: $scope.overlay.top
                });

                return $scope.overlay.show;
            };


        }]);