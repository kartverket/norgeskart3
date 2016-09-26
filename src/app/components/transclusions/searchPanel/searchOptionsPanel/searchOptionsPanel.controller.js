angular.module('searchOptionsPanel')
    .controller('searchOptionsPanelController', ['$scope','mainAppService','$http',
        function($scope, mainAppService,$http) {

            var _clickableLinkClass = {
                icon: 'search-options pointer-cursor',
                text: 'pointer-cursor'
            };

            var _defaultClass = {
                icon: 'search-options',
                text: ''
            };

            var _downloadFromUrl = function (url, name) {
                $http.get(url).then(function (response) {
                    _addSearchOptionToPanel(name, response.data);
                });
            };

            var _fetchElevationPoint = function () {
                var lat = $scope.activePosition.lat;
                var lon = $scope.activePosition.lon;
                var epsgNumber = $scope.activePosition.epsg.split(':')[1];
                var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                _downloadFromUrl(elevationPointUrl, 'elevationPoint');
            };

            var _fetchMatrikkelInfo = function () {
                var lat = $scope.activePosition.geographicPoint[1];
                var lon = $scope.activePosition.geographicPoint[0];
                var matrikkelInfoUrl = mainAppService.generateMatrikkelInfoUrl(lat, lon, lat, lon);
                _downloadFromUrl(matrikkelInfoUrl, 'seEiendom');
            };

            var _fetchKoordTrans = function () {
                var name = 'koordTrans';
                $scope.searchOptionsDict[name] = _constructSearchOption(name, 'x,y', true, 'Se koordinater', {});
            };

            var _fetchSeHavnivaa = function () {
                var name= 'seHavnivaa';
                var lat = $scope.activePosition.geographicPoint[1];
                var lon = $scope.activePosition.geographicPoint[0];
                var extra = {
                    url: mainAppService.generateSeHavnivaaUrl(lat, lon)
                };
                $scope.searchOptionsDict[name] = _constructSearchOption(name, '🌊', true, 'Se havnivå', extra);
                // var lat = $scope.activePosition.geographicPoint[0];
                // var lon = $scope.activePosition.geographicPoint[1];
                // var seHavnivaaUrl = mainAppService.generateSeHavnivaaUrl(lat, lon);
                // _downloadFromUrl(seHavnivaaUrl, 'seHavnivaa');
            };

            var _fetchLagTurkart = function () {
                var name= 'lagTurkart';
                $scope.searchOptionsDict[name] = _constructSearchOption(name, '🚶', true, 'Lag Turkart', {});
            };

            var _addElevationPointToSearchOptions = function (jsonRoot, name) {
                var text = 'Se fakta om stedsnavnet "' + jsonRoot.Output[0].Data.LiteralData.Text + '"';
                var extra = {
                    url: mainAppService.generateFaktaarkUrl(jsonRoot.Output[3].Data.LiteralData.Text)
                };
                $scope.searchOptionsDict['ssrFakta'] = _constructSearchOption('ssrFakta', '⚑', true, text, extra);

                text = jsonRoot.Output[2].Data.LiteralData.Text.split('.')[0] + ' moh';
                extra = {};
                $scope.searchOptionsDict[name] = _constructSearchOption(name, '↑', false, text, extra);
            };

            var _addMatrikkelInfoToSearchOptions = function (jsonRoot, name) {
                if (jsonRoot[0]){
                    jsonRoot = jsonRoot[0];
                }

                if ((jsonRoot.MATRIKKELNR == 'Mnr mangler') ||( jsonRoot.MATRIKKELNR == 'Mnr vann mangler')) {
                    return;
                }

                var extra = {
                    kommunenr: jsonRoot.KOMMUNENR,
                    gardsnr: jsonRoot.GARDSNR,
                    bruksnr: jsonRoot.BRUKSNR,
                    festenr: jsonRoot.FESTENR,
                    seksjonsnr: jsonRoot.SEKSJONSNR,
                    eiendomstype: jsonRoot.EIENDOMSTYPE,
                    matrikkelnr: jsonRoot.MATRIKKELNR
                };

                extra.url = mainAppService.generateSeEiendomUrl(extra.kommunenr, extra.gardsnr, extra.bruksnr, extra.festenr, extra.seksjonsnr);
                var text = 'Se eiendomsinformasjon for ' + extra.kommunenr + '-' + extra.matrikkelnr.replace(new RegExp(' ', 'g'), '');
                $scope.searchOptionsDict[name] = _constructSearchOption(name, '🏠', true, text, extra);

            };

            // var _addSeHavnivaaToSearchOptions = function (jsonRoot, name) {
            //     $scope.searchOptionsDict[name] = _constructSearchOption(name, '🌊', false, '', {});
            // };

            var _addSearchOptionToPanel = function (name, data) {
                var jsonObject;
                var jsonRoot;
                switch (name) {
                    case('elevationPoint'):
                        jsonObject = xml.xmlToJSON(data);
                        jsonRoot = jsonObject.ExecuteResponse.ProcessOutputs;
                        if (!jsonRoot.Output[0].Data.LiteralData) {
                            return;
                        }
                        _addElevationPointToSearchOptions(jsonRoot, name);
                        break;

                    case('seEiendom'):
                        jsonObject = xml.xmlToJSON(data);
                        if (!jsonObject.FeatureCollection) {
                            return;
                        }
                        if (!jsonObject.FeatureCollection.featureMembers) {
                            return;
                        }
                        jsonRoot = jsonObject.FeatureCollection.featureMembers.TEIGWFS;
                        _addMatrikkelInfoToSearchOptions(jsonRoot, name);
                        break;
                    // case('seHavnivaa'):
                    //     jsonObject = xml.xmlToJSON(data);
                    //     if (!jsonObject.tide.meta){
                    //         return;
                    //     }
                    //     jsonRoot = jsonObject.tide.locationlevel;
                    //     _addSeHavnivaaToSearchOptions(jsonRoot, name);
                }
            };

            var _constructSearchOption = function (name, icon, clickable, text, extra) {
                var searchOption = {
                    icon: {
                        value: icon,
                        class: _defaultClass.icon
                    },
                    text: {
                        value: text,
                        class: _defaultClass.text
                    },
                    name: name
                };

                if (clickable) {
                    searchOption.icon.class = _clickableLinkClass.icon;
                    searchOption.text.class = _clickableLinkClass.text;
                }
                for (var key in extra) {
                    searchOption[key] = extra[key];
                }
                return searchOption;
            };

            var _emptySearchOption = function () {
                var searchOption = {
                    icon: {
                        value: '',
                        class: ''
                    },
                    text: {
                        value: '',
                        class: ''
                    },
                    name: ''
                };

                return searchOption;
            };

            var _initSearchOptions = function () {

                $scope.searchOptionsOrder = ['seEiendom', 'ssrFakta', 'seHavnivaa', 'koordTrans', 'lagTurkart'];
                for (var searchOption in $scope.searchOptionsOrder){
                    $scope.searchOptionsDict[$scope.searchOptionsOrder[searchOption]] = _emptySearchOption();
                }
                _fetchElevationPoint();
                _fetchMatrikkelInfo();
                _fetchKoordTrans();
                _fetchSeHavnivaa();
                _fetchLagTurkart();
                // {
                //     icon: '🚑',
                //     text: 'Lage nødplakat',
                //     name: 'nødplakat'
                // }
            };

            _initSearchOptions();

        }
    ]);
