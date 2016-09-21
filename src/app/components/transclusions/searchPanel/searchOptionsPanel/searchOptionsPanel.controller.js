angular.module('searchOptionsPanel')
    .controller('searchOptionsPanelController', ['$scope','mainAppService','$http',
        function($scope, mainAppService,$http){

            var _clickableLinkClassIcon = 'search-options pointer-cursor';

            var _clickableLinkClassText = 'pointer-cursor';

            var _defaultClassIcon = 'search-options';

            var _defaultClassText = '';

            var _downloadFromUrl = function(url, name){
                $http.get(url).then(function(response){
                    _addSearchOptionToPanel(name, response.data);

                });
            };

            var _fetchElevationPoint = function ()
            {
                var lat = $scope.activePosition.lat;
                var lon = $scope.activePosition.lon;
                var epsgNumber = $scope.activePosition.epsg.split(':')[1];
                var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                _downloadFromUrl(elevationPointUrl, 'elevationPoint');
            };

            var _fetchMatrikkelInfo = function()
            {
                var lat = $scope.activePosition.geographicPoint[0];
                var lon = $scope.activePosition.geographicPoint[1];
                var matrikkelInfoUrl=mainAppService.generateMatrikkelInfoUrl(lon, lat, lon, lat);
                _downloadFromUrl(matrikkelInfoUrl, 'seEiendom');
            };

            var _addSearchOptionToPanel = function (name, data){
                var jsonObject = xml.xmlToJSON(data);
                var searchOption = {};
                var jsonRoot;
                switch (name){
                    case('elevationPoint'):
                        jsonRoot=jsonObject.ExecuteResponse.ProcessOutputs;
                        searchOption = {
                            icon: {
                                value: '⚑',
                                class: _clickableLinkClassIcon
                            },
                            text: {
                                value: 'Se fakta om stedsnavnet ' + jsonRoot.Output[0].Data.LiteralData.Text,
                                class: _clickableLinkClassText
                            },
                            name: 'ssrFakta',
                            url: mainAppService.generateFaktaarkUrl(jsonRoot.Output[3].Data.LiteralData.Text)
                        };
                        $scope.searchOptionsDict['ssrFakta'] = searchOption;
                        searchOption ={
                            icon: {
                                value: '↑',
                                class: _defaultClassIcon
                            },
                            text: {
                                value: "Høyde: " + jsonRoot.Output[2].Data.LiteralData.Text.split('.')[0] + ' moh',
                                class: _defaultClassText
                            },
                            name: name
                        };
                        break;

                    case('seEiendom'):
                        jsonRoot=jsonObject.FeatureCollection.featureMembers.TEIGWFS;
                        var knr = jsonRoot.KOMMUNENR;
                        var gnr = jsonRoot.GARDSNR;
                        var bnr = jsonRoot.BRUKSNR;
                        var fnr = jsonRoot.FESTENR;
                        var snr = jsonRoot.SEKSJONSNR;
                        var matrikkelNr = jsonRoot.MATRIKKELNR;
                        searchOption ={
                            icon: {
                                value:'🏠',
                                class: _clickableLinkClassIcon
                            },
                            text: {
                                value:  'Se eiendomsinformasjon for ' + knr + '-' + matrikkelNr.replace(new RegExp(' ','g'),''),
                                class: _clickableLinkClassText
                            },
                            name: name,
                            kommunenr: knr,
                            gardsnr: gnr,
                            bruksnr: bnr,
                            festenr: fnr,
                            seksjonsnr: snr,
                            eiendomstype: jsonRoot.EIENDOMSTYPE,
                            matrikkelnr: matrikkelNr,
                            url: mainAppService.generateSeEiendomUrl(knr,gnr,bnr,fnr,snr)
                        };
                        break;
                    }
                $scope.searchOptionsDict[name] = searchOption;
            };

            var _initSearchOptions= function() {

                $scope.searchOptionsDict = {};
                _fetchElevationPoint();
                _fetchMatrikkelInfo();
                // {
                //     icon: '🚶',
                //     text: 'Lage turkart',
                //     name: 'turKart'
                // },
                // {
                //     icon: '🚑',
                //     text: 'Lage nødplakat',
                //     name: 'nødplakat'
                // },
                // {
                //     icon: '🌊',
                //     text: 'Se havnivå',
                //     name: 'seHavnivå'
                // },
                // {
                //     icon: 'x,y',
                //     text: 'Se koordinater',
                //     name: 'seKoordinater'
                // }
            };

            _initSearchOptions();

        }
    ]);
