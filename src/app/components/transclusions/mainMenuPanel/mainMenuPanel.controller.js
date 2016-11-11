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

            // $scope.showMainMenuDraw = function () {
            //     $scope.mainMenuPanelLayout = "mainMenuDraw";
            // };

            $scope.showMoveableDrawMenu = function () {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay("DrawMenu");
            };

            $scope.showMoveableElevationProfileMenu = function () {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay("ElevationProfile");
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
                var firstVisBaseLayer = map.GetFirstVisibleBaseLayer();
                if (firstVisBaseLayer !== undefined){
                    return firstVisBaseLayer.name;
                }else{
                    return "";
                }
            };

            // $scope.getVisibleSubLayersCount = function () {
            //     var visSubLayers = map.GetVisibleSubLayers();
            //     if (visSubLayers !== undefined){
            //         // if (document.getElementById("countSubLayers").style !== undefined){
            //         //     if (getLength(visSubLayers.length) === 1){
            //         //         document.getElementById("countSubLayers").style.padding = "5px 8px 3px 8px";
            //         //     }else{
            //         //         document.getElementById("countSubLayers").style.padding = "7px 8px 4px 8px";
            //         //     }
            //         // }
            //         return visSubLayers.length;
            //     }else{
            //         // if (document.getElementById("countSubLayers").style !== undefined) {
            //         //     document.getElementById("countSubLayers").style.padding = "5px 8px 3px 8px";
            //         // }
            //         return 0;
            //     }
            // };
            //
            // // function getLength(number) {
            // //     return number.toString().length;
            // // }
        }
    ]);