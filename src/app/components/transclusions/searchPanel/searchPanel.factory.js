angular
    .module('searchPanel')
    .factory('searchPanelFactory', ['mainAppService',
        function(mainAppService) {

        var availableUTMZones=['25832','25833','25834','25835','25836','32632','32633','32634','32635','32636'];

            var sourceDict = {
                'ssr': 'Stedsnavn',
                'adresse': 'Adresse',
                'matrikkelveg': 'Vegnavn',
                'matrikkeladresse': 'Adresse',
                'coordGeo': 'Geografisk koordinat',
                'coordUtm': 'UTM-koordinat',
                'mouseClick': 'Klikk i kartet'

            };

            var generateServiceDict = function (query) {
                var serviceDict = {};
                serviceDict['ssr'] = {
                    url: mainAppService.generateSearchStedsnavnUrl(query, 0),
                    format: 'xml',
                    source: 'ssr',
                    epsg: 'EPSG:32633',
                    nameID: 'stedsnavn',
                    latID: 'nord',
                    lonID: 'aust',
                    kommuneID: 'kommunenavn'
                };
                serviceDict['matrikkelveg'] = {
                    url: mainAppService.generateSearchMatrikkelVegUrl(query),
                    format: 'json',
                    source: 'matrikkelveg',
                    epsg: 'EPSG:32632',
                    nameID: 'NAVN',
                    latID: 'LATITUDE',
                    lonID: 'LONGITUDE',
                    kommuneID: 'KOMMUNENAVN'
                };
                serviceDict['matrikkeladresse'] = {
                    url: mainAppService.generateSearchMatrikkelAdresseUrl(query),
                    format: 'json',
                    source: 'matrikkeladresse',
                    epsg: 'EPSG:32632',
                    nameID: 'NAVN',
                    latID: 'LATITUDE',
                    lonID: 'LONGITUDE',
                    kommuneID: 'KOMMUNENAVN'
                };
                /*
                 serviceDict['adresse'] = {
                 url: mainAppService.generateSearchAdresseUrl(query),
                 format: 'json',
                 source: 'adresse',
                 epsg: 'EPSG:4326',
                 nameID: 'adressenavn',
                 latID: 'nord',
                 lonID: 'aust'
                 };*/
                return serviceDict;
            };

            var searchOptionsOrder=['seEiendom', 'ssrFakta',  'koordTrans', 'lagTurkart', 'lagNodplakat'];


            return {
                getSourceDict: function () {
                    return sourceDict;
                },
                getServiceDict: function (query) {
                    return generateServiceDict(query);
                },
                getAvailableUTMZones: function () {
                    return availableUTMZones;
                },
                getSearchOptionsOrder: function () {
                    return searchOptionsOrder;
                }
            };

        }
        ]);