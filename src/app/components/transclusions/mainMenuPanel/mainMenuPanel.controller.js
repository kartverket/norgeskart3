angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', '$http', 'moveableOverlayFactory','mapOverlaysLayoutFactory', 'localStorageFactory', 'mainAppService', 'isyTranslateFactory', 'ISY.MapAPI.Map',
        function($scope, $http, moveableOverlayFactory, mapOverlaysLayoutFactory, localStorageFactory, mainAppService, isyTranslateFactory, map){

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

            // FAQ
            var _faqResponse = function (response) {
              if (response.status === 200) {
                $scope.faqExpand = -1;
                $scope.faqItems = response.data;
                $scope.mainMenuPanelLayout = "mainMenuFaq";
              }
            };
            $scope.faqToggle = function ($event, $index) {
              $event.preventDefault();
              $scope.faqExpand = $scope.faqExpand === $index ? -1 : $index;
            };
            $scope.showMainMenuFaq = function () {
              $scope.faqExpand = -1;
              $scope.faqItems = [];
              var currentLanguage = isyTranslateFactory.getCurrentLanguage();
              var languageId = currentLanguage.id || 'no';
              var url = mainAppService.generateFaqUrl(languageId);
              $http.get(url).then(_faqResponse);
            };
            // !FAQ

            $scope.showMoveableDrawMenu = function () {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay("DrawMenu");
            };

            $scope.showMoveableShareMapMenu = function () {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay("ShareMap");
            };

            $scope.showMoveableElevationProfileMenu = function () {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay("ElevationProfile");
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