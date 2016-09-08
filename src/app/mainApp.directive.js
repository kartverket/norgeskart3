angular.module('mainApp')
    .directive('mainApp', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'mainAppBody.html',
                link: function (scope, element) {
                    if (element.scope){
                        element = $(element);
                    }

                    var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                    var measureLine = toolsFactory.getToolById("MeasureLine");
                    var measure = toolsFactory.getToolById("Measure");
                    var pointSelectTool = toolsFactory.getToolById('PointSelect');

                    $(document).keyup(function(e){
                        if (e.keyCode == 27){
                            if (addFeatureTool.isSelected || measureLine.isSelected || measure.isSelected){
                                toolsFactory.deactivatAllTools();
                                toolsFactory.activateTool(pointSelectTool);
                            }
                        }
                    });

                    element.on('mousedown touchstart', function () {
                        if (!addFeatureTool.isSelected && !measureLine.isSelected && !measure.isSelected){
                            toolsFactory.activateTool(pointSelectTool);
                        }
                    });

                }
            };
        }
    ]);
