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

                    scope.drawFeature = function (type) {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        drawFeatureTool.additionalOptions.type=type;
                        toolsFactory.activateTool(drawFeatureTool);
                        console.log('Activation invoked');
                        eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    };

                    var getDrawing = function (geoJSON) {
                        console.log(geoJSON);
                    };

                    /*
                     Draw end
                     */

                }
            };
        }]);