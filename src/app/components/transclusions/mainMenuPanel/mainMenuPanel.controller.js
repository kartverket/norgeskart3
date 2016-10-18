angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', 'moveableOverlayFactory',
        function($scope, moveableOverlayFactory){

            $scope.drawActivated=false;

            $scope.mainMenuPanelLayout = "mainMenuSections";

            $scope.showMainMenuBaseLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuBaseLayers";
            };

            $scope.showMainMenuSections = function () {
                $scope.mainMenuPanelLayout = "mainMenuSections";
            };

            $scope.showMainMenuGroupLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuGroupLayers";
            };

            $scope.showMainMenuDraw = function () {
                $scope.mainMenuPanelLayout = "mainMenuDraw";
            };

            $scope.showMoveableDrawMenu = function () {
                moveableOverlayFactory.setActiveOverlay("DrawMenu");
            };

            $scope.isDrawActivated = function () {
                if($scope.drawActivated){
                    return true;
                }
                else {
                    $scope.drawActivated=true;
                    return false;
                }
            };

            $scope.setGeoJSON = function (GeoJSON) {
                $scope.GeoJSON=GeoJSON;
            };
        }
    ]);