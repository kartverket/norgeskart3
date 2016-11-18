angular.module('searchLagNodplakatPanel')
    .controller('searchLagNodplakatPanelController', [ '$scope','mainAppService','$http','ISY.MapAPI.Map',
        function($scope, mainAppService,$http, map) {
            $scope.showLagNodplakatPage1 = function () {
                map.SetCenter($scope.activePosition);
                $scope.searchLagNodplakatPanelLayout = 'page1';
            };
            $scope.showLagNodplakatPage2 = function () {
                map.SetCenter($scope.activePosition);
                $scope.searchLagNodplakatPanelLayout = 'page2';
            };

            $scope.searchLagNodplakatPanelLayout = 'page1';

            var _downloadFromUrl = function (url, name) {
                $http.get(url).then(function (response) {
                    _retrieveDataFromResponse(name, response.data);
                });
            };

            var _fetchEmergencyPosterData = function () {
                var lat = $scope.activePosition.geographicPoint[1];
                var lon = $scope.activePosition.geographicPoint[0];
                var elevationPointUrl = mainAppService.generateEmergencyPosterPointUrl(lat, lon);
                _downloadFromUrl(elevationPointUrl, 'emergencyPosterPoint');
            };

            var _fetchPlacenamesByBbox = function () {
                var extent = map.GetExtent();
                var placenamesByBboxUrl = mainAppService.generateSearchStedsnavnBboxUrl(extent[0], extent[1], extent[2], extent[3]);
                _downloadFromUrl(placenamesByBboxUrl, 'placenamesByBbox');
            };

            var _parseEmergencyPosterPointData = function (jsonRoot, name) {
                $scope.lagNodplakatDict[name] = jsonRoot;
            };

            var _parsePlacenamesByBboxData = function (jsonRoot, name) {
                $scope.lagNodplakatDict[name] = jsonRoot;
                $scope.activePlaceName=jsonRoot[0].stedsnavn;
                $scope.setSearchBarText($scope.activePlaceName);
                $scope.lagNodplakatName = $scope.activePlaceName;
            };

            var _retrieveDataFromResponse = function (name, data) {
                var jsonObject;
                var jsonRoot;
                switch (name) {
                    case('emergencyPosterPoint'):
                        jsonRoot=data;
                        _parseEmergencyPosterPointData(jsonRoot, name);
                        break;
                    case('placenamesByBbox'):
                        jsonObject = data;
                        jsonRoot=jsonObject.stedsnavn;
                        _parsePlacenamesByBboxData(jsonRoot, name);
                        break;
                }
            };

            var _emptyLagNodplakatDict = function () {
                var names = ['emergencyPosterPoint', 'placenamesByBbox'];
                for (var name in names){
                    $scope.lagNodplakatDict[names[name]] = {};
                }

            };

            $scope.initLagNodplakat = function () {
                if ($scope.lagNodplakatDict ) {
                    _emptyLagNodplakatDict();
                }
                else {
                    $scope.lagNodplakatDict={};
                }
                _fetchEmergencyPosterData();
                _fetchPlacenamesByBbox();
            };

            $scope.initLagNodplakat();

            $scope.generateEmergencyPosterPreviewImage = function () {
                var extent = map.GetExtent();
                return mainAppService.generateEmergencyPosterPreviewImageUrl(extent[0], extent[1], extent[2], extent[3]);
            };

            $scope.setNodePlagatName = function (value) {
                $scope.lagNodplakatName = value;
                $scope.activePlaceName = value;

            };


        }
    ]);