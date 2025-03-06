angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', 'moveableOverlayFactory','mapOverlaysLayoutFactory', 'localStorageFactory', 'ISY.MapAPI.Map', 'mainAppService', '$http',
        function($scope, moveableOverlayFactory, mapOverlaysLayoutFactory, localStorageFactory, map, mainAppService, $http) {

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

            // Initialize message properties
            $scope.message = '';
            $scope.messageType = 'info'; // Can be 'info', 'warning', or 'error'
            
            // Function to show a message with type
            $scope.showMessage = function(message, type) {
                $scope.message = message;
                $scope.messageType = type || 'info';
            };
            
            // Function to dismiss the message
            $scope.dismissMessage = function() {
                $scope.message = '';
            };

            //var currentLanguage = isyTranslateFactory.getCurrentLanguage();
            //var languageId = currentLanguage.id || 'no';
            var languageId = 'no';
            var url = mainAppService.messagesUrl(languageId);
            $http.get(url)
            .then(function(response){
                $scope.message = response.data;
            })
            .catch(function(response){
                console.error('Messages error: ', response.status, response.data);
            })

        }
    ]);
