angular.module('moveableOverlay')
    .controller('moveableOverlayController', ['$scope','moveableOverlayFactory', '$element',
        function($scope, moveableOverlayFactory, $element) {
            if ($element.scope){
                $element = $($element);
            }

            $scope.menuDrawShow = function(){
                // $scope.overlay = moveableOverlayFactory.getActiveOverlay();
                if (moveableOverlayFactory.getActiveOverlay() !== undefined){
                    $element.css({
                        left: moveableOverlayFactory.getActiveOverlay().left,
                        top: moveableOverlayFactory.getActiveOverlay().top
                    });
                    $scope.header = moveableOverlayFactory.getActiveOverlay().headingTitle;
                    $scope.headerIcon = moveableOverlayFactory.getActiveOverlay().headingIcon;
                }
                return moveableOverlayFactory.isOverlayVisible();
            };
            $scope.menuElevationProfileShow = function(){
                // $scope.overlay = moveableOverlayFactory.getActiveOverlay();
                if (moveableOverlayFactory.getActiveOverlay() !== undefined){
                    $element.css({
                        left: moveableOverlayFactory.getActiveOverlay().left,
                        top: moveableOverlayFactory.getActiveOverlay().top
                    });
                    $scope.header = moveableOverlayFactory.getActiveOverlay().headingTitle;
                    $scope.headerIcon = moveableOverlayFactory.getActiveOverlay().headingIcon;
                }
                return moveableOverlayFactory.isOverlayVisible();
            };

        }]);