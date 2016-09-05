angular.module('mainApp')
    .directive('mainApp', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'mainAppBody.html',
                link: function () {

                    var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                    var measureLine = toolsFactory.getToolById("MeasureLine");
                    var measure = toolsFactory.getToolById("Measure");

                    $(document).keyup(function(e){
                        if (e.keyCode == 27){
                            if (addFeatureTool.isSelected || measureLine.isSelected || measure.isSelected){
                                toolsFactory.deactivatAllTools();
                                toolsFactory.setSelectTool('PointSelect');
                            }
                        }
                    });

                }
            };
        }
    ]);
