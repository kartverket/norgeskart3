angular.module('searchLagTurkartPanel')
    .directive('searchLagTurkartPanel', ['toolsFactory','ISY.EventHandler','$http','mainAppService','$window',
        function(toolsFactory, eventHandler, $http, mainAppService,$window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
                restrict: 'A',
                link: function(scope){

                    var extent= {};
                    var mapLink = "";
                    var retryMapCreation=true;
                    scope.mapAvailable = false;
                    scope.createMapButtonOn = true;
                    scope.showLegend=false;
                    scope.showTrips=false;


                    eventHandler.RegisterEvent(ISY.Events.EventTypes.PrintBoxSelectReturnValue, _boxExtent);

                    function _boxExtent(newExtent){
                        extent=newExtent;
                    }

                    var _activatePrintBoxSelect = function(scale) {
                        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                        printBoxSelectTool.additionalOptions.scale = scale;
                        toolsFactory.activateTool(printBoxSelectTool);
                    };



                    scope.applyScale = function (scale) {
                        scope.deactivatePrintBoxSelect();
                        _activatePrintBoxSelect(scale);
                        scope.scale = scale;
                    };

                    scope.scales={
                        '25000': '1: 25 000',
                        '50000': '1: 50 000'
                    };

                    scope.scale='25000';

                    scope.tittel="";

                    _activatePrintBoxSelect(scope.scale);



                    scope.orderMap= function(){
                        if(!extent.bbox){
                            return;
                        }
                        scope.createMapButtonOn = false;
                        scope.mapAvailable = false;
                        var json = _createJson();
                        $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
                        var urlLagTurkart=mainAppService.generateLagTurkartUrl();
                        $http.post(urlLagTurkart,json).then(
                            function(response){_mapReadyForDownload(response, urlLagTurkart);},
                            function(response){_mapCreationFailed(response);}
                        );

                    };

                    var _createJson=function () {
                        return {
                            map: {
                                bbox: extent.bbox,
                                    center: extent.center,
                                    dpi: "300",
                                    layers: [{
                                    baseURL: "http://wms.geonorge.no/skwms1/wms.toporaster3",
                                    customParams: {"TRANSPARENT": "false"},
                                    imageFormat: "image/jpeg",
                                    layers: ["toporaster"],
                                    opacity: 1,
                                    type: "WMS"
                                }],
                                    projection: extent.projection,
                                    sone: extent.sone,
                                    biSone: ""
                            },
                            paging: 12,
                            layout: "A4 landscape",
                            scale: extent.scale,
                            titel: scope.tittel,
                            legend: scope.showLegend,
                            trips: scope.showTrips,
                            link: "http://www.norgeskart.no/turkart/#9/238117/6674760"
                        };
                    };

                    var _mapCreationFailed = function(){
                        if (retryMapCreation) {
                            console.log('Map creation failed. Retrying.');
                            retryMapCreation=false;
                            scope.orderMap();
                        }
                        else {
                            console.log('Retrying map creation failed. Try again later or contact Kartverket.');
                            scope.createMapButtonOn = true;
                        }
                    };

                    var _mapReadyForDownload = function (response, urlLagTurkart) {
                        scope.mapAvailable = true;
                        scope.createMapButtonOn = true;
                        mapLink=urlLagTurkart.replace('getprint2.py','') + response.data.linkPdf;
                    };

                    scope.downloadMap=function () {
                        $window.open(mapLink, '_blank');
                    };

                }
            };
        }]);