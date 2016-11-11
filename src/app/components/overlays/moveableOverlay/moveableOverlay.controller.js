angular.module('moveableOverlay')
    .controller('moveableOverlayController', ['$scope','moveableOverlayFactory', '$element',
        function($scope, moveableOverlayFactory, $element) {
            if ($element.scope){
                $element = $($element);
            }

            $scope.menuShowMoveableOverlay = function(id){
                // $scope.overlay = moveableOverlayFactory.getActiveOverlay();
                var overlay = moveableOverlayFactory.getActiveOverlayById(id);
                if (overlay !== undefined){
                    $element.css({
                        left: overlay.left,
                        top: overlay.top
                    });
                    $scope.header = overlay.headingTitle;
                    $scope.headerIcon = overlay.headingIcon;
                    return moveableOverlayFactory.isOverlayVisibleById(id);
                }
                return false;

            };
        }]);