angular.module('mainMenuDraw')
    .directive('mainMenuDraw', [ 'toolsFactory', 'ISY.EventHandler', '$location','mainAppService', '$http','$filter',
        function(toolsFactory, eventHandler, $location,mainAppService,$http,$filter) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuDraw/mainMenuDraw.html',
                restrict: 'A',
                link: function(scope){

                    /*
                     Measure tools start
                     */
                    function _startMeasure (style) {
                        var featureTool;
                        switch (style){
                            case "Line":
                                featureTool = toolsFactory.getToolById("MeasureLine");
                                toolsFactory.activateTool(featureTool);
                                break;
                            case "Polygon":
                                featureTool = toolsFactory.getToolById("Measure");
                                toolsFactory.activateTool(featureTool);
                                break;
                        }
                    }

                    scope.measureLine = function () {
                        _startMeasure("Line");
                    };

                    scope.measurePolygon = function () {
                        _startMeasure("Polygon");
                    };
                    /*
                     Measure tools end
                     */

                    /*
                     Draw start
                     */

                    _operation="";
                    scope.mode="draw";

                    var getDrawing = function (geoJSON) {
                        scope.GeoJSON=geoJSON;
                        console.log(geoJSON);
                    };

                    var _checkUrlForGeoJSON = function () {
                        var drawingHash=_getValueFromUrl('drawing');
                        if(drawingHash){
                            _getGeoJSON(drawingHash);
                                return;
                            }
                        _activateDrawFeatureTool();
                    };

                    var _getValueFromUrl = function (key) {
                        var url=$location.url();
                        var params=url.split('?')[1].split('&');
                        for(var i =0; i<params.length; i++){
                            var param=params[i].split('=');
                            if(param[0]==key) {
                                return param[1];
                            }
                        }
                    };

                    var _getGeoJSON = function (hash) {
                        var drawingUrl=mainAppService.generateGeoJSONUrl(hash);
                        $http.get(drawingUrl).then(function(result){_setGeoJSONOnScope(result);});
                    };

                    var _setGeoJSONOnScope = function(result){
                        scope.GeoJSON = result.data;
                        _activateDrawFeatureTool();
                    };

                    var _activateDrawFeatureTool = function (type) {
                        if(!type){
                            type='Point';
                        }
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        if(scope.GeoJSON){
                            drawFeatureTool.additionalOptions.GeoJSON=scope.GeoJSON;
                        }
                        drawFeatureTool.additionalOptions.operation=_operation;
                        drawFeatureTool.additionalOptions.type=type;
                        drawFeatureTool.additionalOptions.snap=scope.snap;
                        drawFeatureTool.additionalOptions.mode=scope.mode;
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                    };

                    scope.drawFeature = function (type) {
                        _activateDrawFeatureTool(type);
                    };

                    scope.snapButtonClick = function () {
                        scope.toggleSnap();
                        _activateDrawFeatureTool('Active');
                    };

                    scope.newButtonClick = function(){
                        scope.GeoJSON='remove';
                        _removeDrawingFromUrl();
                        _activateDrawFeatureTool('Active');
                    };

                    var _removeDrawingFromUrl = function () {
                        var hash=_getValueFromUrl('drawing');
                        var oldUrl=$location.url();
                        $location.url(oldUrl.replace('drawing=' + hash, ''));
                    };

                    scope.undoButtonClick = function(){
                        _operation='undo';
                        _activateDrawFeatureTool('Active');
                        _operation="";
                    };

                    scope.downloadButtonClick=function () {
                        if(scope.GeoJSON=='remove'){
                            alert('Empty drawing');
                        }
                        else {
                            scope.saveToPc(scope.GeoJSON);
                        }
                    };

                    scope.saveButtonClick = function () {
                        var saveUrl=mainAppService.generateGeoJSONSaveUrl();
                        $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
                        $http.post(saveUrl,scope.GeoJSON).then(function(result){_setDrawingInUrl(result);});
                    };

                    scope.modifyButtonClick= function () {
                        scope.mode='modify';
                        _activateDrawFeatureTool('Active');
                    };

                    scope.drawButtonClick= function () {
                        scope.mode='draw';
                        _activateDrawFeatureTool('Active');
                    };

                    scope.selectButtonClick= function () {
                        scope.mode='select';
                        _activateDrawFeatureTool('Active');
                    };

                    var _setDrawingInUrl = function (result) {
                        var drawingUrl=result.data;
                        var hashIndex=drawingUrl.split('/').length-1;
                        var hash = drawingUrl.split('/')[hashIndex].split('.')[0];
                        _removeDrawingFromUrl();
                        var oldUrl=$location.url();
                        $location.url(oldUrl + '&drawing=' + hash);
                        _checkUrlForGeoJSON();
                    };

                    scope.removeInfomarkers();
                    if(!scope.isDrawActivated()) {
                        eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    }
                    _checkUrlForGeoJSON();
                    /*
                     Draw end
                     */

                    scope.saveToPc = function (data, filename) {

                        if (!data) {
                            console.error('No data');
                            return;
                        }

                        if (!filename) {
                            var today = $filter('date')(new Date(),'yyyyMMddHHmmss');
                            filename = 'Norgeskart3.tegning.' + today + '.json';
                        }

                        if (typeof data === 'object') {
                            data = JSON.stringify(data, undefined, 2);
                        }

                        var blob = new Blob([data], {type: 'text/json'});

                        // FOR IE:

                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }
                        else{
                            var e = document.createEvent('MouseEvents'),
                                a = document.createElement('a');

                            a.download = filename;
                            a.href = window.URL.createObjectURL(blob);
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                            e.initEvent('click', true, false, window,
                                0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            a.dispatchEvent(e);
                        }
                    };

                }
            };
        }]);