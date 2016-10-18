angular.module('moveableOverlay')
    .controller('moveableOverlayController', ['$scope','moveableOverlayFactory', '$element',
        function($scope, moveableOverlayFactory, $element) {
            if ($element.scope){
                $element = $($element);
            }

            function _initMoveableOverlay(){
                $scope.overlay = moveableOverlayFactory.getOverlayById("DrawMenu");
                var elementMapDiv = document.getElementById('mapDiv');
                if (elementMapDiv !== null){
                    if ($scope.overlay.left + 802 > elementMapDiv.offsetWidth && $scope.overlay.left + 476 > elementMapDiv.offsetWidth){
                        moveableOverlayFactory.setPositionForOverlayByHeaderName("draw_menu",92, 20);
                        // $scope.overlay = moveableOverlayFactory.getOverlayById("DrawMenu");
                    }
                }
                // $scope.header = $scope.overlay.headingTitle;
                $element.css({
                    left: $scope.overlay.left,
                    top: $scope.overlay.top
                });
            }

            $scope.header = moveableOverlayFactory.getOverlayById("DrawMenu").headingTitle;

            $scope.menuDrawShow = function(){
                return moveableOverlayFactory.getOverlayById("DrawMenu").show;//$scope.overlay.show;
            };

            _initMoveableOverlay();

        }]);