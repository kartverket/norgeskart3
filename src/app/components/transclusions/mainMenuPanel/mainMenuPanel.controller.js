angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', 'moveableOverlayFactory','mapOverlaysLayoutFactory', 'ISY.MapAPI.Map',
        function($scope, moveableOverlayFactory, mapOverlaysLayoutFactory, map){

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
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.setActiveOverlay("DrawMenu");
            };

            $scope.showShareMapMenu = function (){
                $scope.mainMenuPanelLayout = "mainMenuShareMap";
            };

            $scope.showIframeMenu = function (){
                $scope.mainMenuPanelLayout = "mainMenuIframe";
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

            $scope.getSelectedBaseLayerName = function () {
                if (map.GetFirstVisibleBaseLayer() !== undefined){
                    return map.GetFirstVisibleBaseLayer().name;
                }else{
                    return "";
                }
            };
        }
    ]);