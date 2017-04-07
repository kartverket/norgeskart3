angular.module('searchLagNodplakatPanel')
    .controller('searchLagNodplakatPanelController', [ '$scope', 'mainAppService', '$http', 'ISY.MapAPI.Map',
        function ($scope, mainAppService, $http, map) {
            $scope.lagNodplakatConfirmRoad = false;
            $scope.valgtTekst = 'CorrectRoad';

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

            var _fetchElevationPoint = function () {
                var lat = $scope.activePosition.lat;
                var lon = $scope.activePosition.lon;
                var epsgNumber = $scope.mapEpsg.split(':')[1];
                var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                _downloadFromUrl(elevationPointUrl, 'elevationPoint');
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

            var _retrieveDataFromResponse = function (name, data) {
                switch (name) {
                    case ('elevationPoint'):
                        $scope.activePlaceName = data.placename;
                        $scope.setSearchBarText($scope.activePlaceName);
                        $scope.lagNodplakatName = $scope.activePlaceName;
                        break;
                    case ('emergencyPosterPoint'):
                        $scope.lagNodplakatDict[name] = data;
                        if (data.veg === "") {
                          $scope.nodplakatConfirmRoad = true;
                        }
                        break;
                    case ('placenamesByBbox'):
                        $scope.lagNodplakatDict[name] = data.stedsnavn;
                        if (!$scope.activePlaceName) {
                            $scope.activePlaceName = data.stedsnavn[0].stedsnavn;
                            $scope.setSearchBarText($scope.activePlaceName);
                            $scope.lagNodplakatName = $scope.activePlaceName;
                        }
                        break;
                }
            };

            var _emptyLagNodplakatDict = function () {
                var names = ['elevationPoint', 'emergencyPosterPoint', 'placenamesByBbox'];
                for (var name in names) {
                    $scope.lagNodplakatDict[names[name]] = {};
                }

            };

            $scope.initLagNodplakat = function () {
                if ($scope.lagNodplakatDict) {
                    _emptyLagNodplakatDict();
                }
                else {
                    $scope.lagNodplakatDict = {};
                }
                _fetchElevationPoint();
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

            $scope.setlagNodplakatConfirmRoad = function (value) {
                $scope.lagNodplakatConfirmRoad = value;
                $scope.nodplakatConfirmRoad = true;
                if (value) {
                  $scope.valgtTekst = 'Ja';
                } else {
                  $scope.valgtTekst = 'Nei';
                }
            };
          }
  ]);
