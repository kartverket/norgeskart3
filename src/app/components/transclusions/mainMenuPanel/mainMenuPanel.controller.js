angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', 'moveableOverlayFactory','mapOverlaysLayoutFactory', 'localStorageFactory', 'ISY.MapAPI.Map',
        function($scope, moveableOverlayFactory, mapOverlaysLayoutFactory, localStorageFactory, map){

            $scope.drawActivated=false;

            $scope.mainMenuPanelLayout = "mainMenuSections";
            
            $scope.resetApplication = function ($event) {
                $event.preventDefault();
                localStorageFactory.remove('lat');
                localStorageFactory.remove('lon');
                localStorageFactory.remove('zoom');
                localStorageFactory.set('mainMenuIsOpen', false);
                location.hash = '';
                location.reload($event.shiftKey);
            };

            $scope.showMainMenuBaseLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuBaseLayers";
            };

            $scope.showMainMenuSections = function () {
                $scope.mainMenuPanelLayout = "mainMenuSections";
            };

            $scope.showMainMenuGroupLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuGroupLayers";
            };

            $scope.showMainMenuContact = function () {
              $scope.mainMenuPanelLayout = "mainMenuContact";
            };

            $scope.showMainMenuPrivacy = function() {
                $scope.mainMenuPanelLayout = "mainMenuPrivacy";
            };

            $scope.showMainMenuFaq = function () {
                $scope.mainMenuPanelLayout = "mainMenuFaq";
            };

            function _setActiveMoveableMenu(menuName) {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay(menuName);
                $scope.menuShowMoveableOverlay(menuName);
            }

            $scope.moveableOverlayLayout = "";
            
            $scope.showMoveableDrawMenu = function () {
                _setActiveMoveableMenu("DrawMenu");
            };

            $scope.showMoveableShareMapMenu = function () {
                $scope.moveableOverlayLayout = "menuShareMapLayout";
                _setActiveMoveableMenu("ShareMap");
            };

            $scope.showMoveableElevationProfileMenu = function () {
                $scope.moveableOverlayLayout = "menuElevationProfileLayout";
                _setActiveMoveableMenu("ElevationProfile");
            };

            $scope.showMoveablePrintMenu = function() {
                $scope.moveableOverlayLayout = "menuPrintLayout";
                _setActiveMoveableMenu("PrintMenu");
            };

            $scope.deactivateMoveableOverlay = function(){
                $scope.moveableOverlayLayout = "";
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
        }
    ]);