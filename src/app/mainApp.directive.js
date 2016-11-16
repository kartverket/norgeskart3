angular.module('mainApp')
    .directive('mainApp', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'mainAppBody.html',
                controller: 'mainAppController',
                link: function (scope, element) {
                    if (element.scope){
                        element = $(element);
                    }

                    var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                    var measureLine = toolsFactory.getToolById("MeasureLine");
                    var measure = toolsFactory.getToolById("Measure");
                    var pointSelectTool = toolsFactory.getToolById('PointSelect');
                    var printBoxSelect = toolsFactory.getToolById('PrintBoxSelect');
                    var drawFeature = toolsFactory.getToolById('DrawFeature');

                    element.on('mousedown touchstart', function () {
                        if (!addFeatureTool.isSelected && !measureLine.isSelected && !measure.isSelected && !printBoxSelect.isSelected &&!drawFeature.isSelected){
                            toolsFactory.activateTool(pointSelectTool);
                        }
                    });

                }
            };
        }
    ]);
