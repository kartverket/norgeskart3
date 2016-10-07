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

                    scope.drawFeature = function () {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        drawFeatureTool.additionalOptions.type='Polygon';
                        toolsFactory.activateTool(drawFeatureTool);
                        console.log('Activation invoked');
                        scope.closeNav();
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