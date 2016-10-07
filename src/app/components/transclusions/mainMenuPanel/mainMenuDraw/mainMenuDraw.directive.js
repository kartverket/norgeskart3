angular.module('mainMenuDraw')
    .directive('mainMenuDraw', [ 'toolsFactory', 'ISY.EventHandler', //'ISY.MapAPI.Map',
        function(toolsFactory, eventHandler) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuDraw/mainMenuDraw.html',
                restrict: 'A',
                link: function(scope){

                    /*
                     Draw start
                     */

                    var _setGeometryType = function(type){
                        drawFeatureTool.additionalOptions.type=type;
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                    };
                    
                    scope.drawFeature = function (type) {
                        _setGeometryType(type);
                    };

                    var getDrawing = function (geoJSON) {
                        console.log(geoJSON);
                    };

                    scope.deactivateDrawFeature = function () {
                        toolsFactory.deactivateTool(drawFeatureTool);
                    };

                    var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                    _setGeometryType('Point');
                    eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    /*
                     Draw end
                     */

                }
            };
        }]);