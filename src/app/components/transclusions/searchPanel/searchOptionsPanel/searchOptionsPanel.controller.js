angular.module('searchOptionsPanel')
    .controller('searchOptionsPanelController', ['$scope','mainAppService','$http',
        function($scope, mainAppService,$http){

            var _downloadFromUrl = function(url, name){
                $http.get(url).then(function(response){
                    console.log(response.data);
                    _addSearchOptionToPanel(name, response.data);

                });
            };

            var _fetchElevationPoint = function ()
            {
                var lat = $scope.activePosition.lat;
                var lon = $scope.activePosition.lon;
                var epsgNumber = $scope.activePosition.epsg.split(':')[1];
                var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                console.log(elevationPointUrl);
                _downloadFromUrl(elevationPointUrl, 'elevationPoint');
            };

            var _addSearchOptionToPanel = function (name, data){
                var jsonObject = xml.xmlToJSON(data);
                console.log(jsonObject);
                var searchOption = {};
                switch (name){
                    case('elevationPoint'):

                        searchOption = {
                            icon: '⚑',
                            text: 'Se fakta om stedsnavnet ' + jsonObject.ExecuteResponse.ProcessOutputs.Output[0].Data.LiteralData.Text,
                            name: 'ssrFakta',
                            url: "http://faktaark.statkart.no/SSRFakta/faktaarkfraobjektid?enhet=" + jsonObject.ExecuteResponse.ProcessOutputs.Output[3].Data.LiteralData.Text
                        };
                        $scope.searchOptions.push(searchOption);
                        searchOption ={
                            icon: '↑',
                            text: "Høyde: " + jsonObject.ExecuteResponse.ProcessOutputs.Output[2].Data.LiteralData.Text.split('.')[0] + ' moh',
                            name: name
                        };

                    }




                $scope.searchOptions.push(searchOption);
            };

            var _initSearchOptions= function() {

                $scope.searchOptions = [
                // {
                //     icon: '🏠',
                //     text: 'Se eiendom',
                //     name: 'seEiendom'
                // },
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

                ];};

            _fetchElevationPoint();
            _initSearchOptions();

        }
    ]);
