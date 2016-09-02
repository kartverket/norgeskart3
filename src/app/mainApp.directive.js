angular.module('mainApp')
    .directive('mainApp', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'mainAppBody.html',
                link: function () {

                    var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");

                    $(document).keyup(function(e){
                        if (e.keyCode == 27){
                            if (addFeatureTool.isSelected){
                                toolsFactory.deactivatAllTools();
                                toolsFactory.setSelectTool('PointSelect');
                            }
                        }
                    });

                }
            };
        }
    ]);
