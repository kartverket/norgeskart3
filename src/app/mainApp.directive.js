angular.module('mainApp')
    .directive('mainApp', ['mapToolsFactory',
        function(mapToolsFactory) {
            return {
                templateUrl: 'mainAppBody.html',
                link: function () {

                    var addFeatureTool = mapToolsFactory.getToolById("AddLayerFeature");

                    $(document).keyup(function(e){
                        if (e.keyCode == 27){
                            if (addFeatureTool.isSelected){
                                mapToolsFactory.deactivatAllTools();
                                mapToolsFactory.setSelectTool('PointSelect');
                            }
                        }
                    });

                }
            };
        }
    ]);
