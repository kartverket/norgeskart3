angular
    .module('tools')
    .factory('toolsFactory', ['ISY.MapAPI.Tools.ToolFactory','isyTranslateFactory',
        function(toolFactory, isyTranslateFactory) {

            var tools = [
                {
                    "id": "PointSelect",
                    "title": "PointSelect_title",
                    "hover": "PointSelect_hover",
                    "symbol": "glyphicon glyphicon-map-marker",
                    "sortOrder": 0,
                    "isSelected": true,
                    "cursorStyle": "default"
                },
                {
                    "id": "BoxSelect",
                    "title": "BoxSelect_title",
                    "hover": "BoxSelect_hover",
                    "symbol": "glyphicon glyphicon-unchecked",
                    "sortOrder": 1,
                    "isSelected": false,
                    "cursorStyle": "default"
                },
                {
                    "id": "FeatureHoverInfo",
                    "title": "FeatureHoverInfo_title",
                    "hover": "FeatureHoverInfo_hover",
                    "symbol": "glyphicon glyphicon-unchecked",
                    "sortOrder": 2,
                    "isSelected": false,
                    "cursorStyle": "default"
                },
                {
                    "id": "FeatureEditor",
                    "title": "FeatureEditor_title",
                    "hover": "FeatureEidtor_hover",
                    "symbol": "glyphicon glyphicon-unchecked",
                    "sortOrder": 3,
                    "isSelected": false,
                    "cursorStyle": "crosshair"
                },
                {
                    "id": "DefaultZoom",
                    "title": "DefaultZoom_title",
                    "hover": "DefaultZoom_hover",
                    "symbol": "glyphicon glyphicon-unchecked",
                    "sortOrder": 4,
                    "isSelected": false,
                    "cursorStyle": "zoom-in"
                },
                {
                    "id": "MeasureLine",
                    "title": "MeasureLine_title",
                    "hover": "MeasureLine_hover",
                    "symbol": "flaticon-tool292",
                    "sortOrder": 6,
                    "isSelected": false,
                    "cursorStyle": "default"
                },
                {
                    "id": "Measure",
                    "title": "Measure_title",
                    "hover": "Measure_hover",
                    "symbol": "flaticon-triangular43",
                    "sortOrder": 5,
                    "isSelected": false,
                    "cursorStyle": "default"
                },
                {
                    "id": "DrawFeature",
                    "title": "DrawFeature_title",
                    "hover": "DrawFeature_hover",
                    "symbol": "flaticon-triangular43",
                    "sortOrder": 7,
                    "isSelected": false,
                    "cursorStyle": "default",
                    "additionalOptions": {
                        type: 'Point'
                    }
                },
                {
                    "id": "AddLayerFeature",
                    "title": "AddLayerFeature_title",
                    "hover": "AddLayerFeature_hover",
                    "symbol": "flaticon-triangular43",
                    "sortOrder": 8,
                    "isSelected": false,
                    "cursorStyle": "default",
                    "additionalOptions": {
                        'type':[{
                            'type': "Point",
                            'active': true
                        },
                            {
                                'type': "Line",
                                'active': false
                            },
                            {
                                'type': "Polygon",
                                'active': false
                            }
                        ],
                        'snappingFeatures': []
                    }
                },
                {
                    "id": "ModifyFeature",
                    "title": "ModifyFeature_title",
                    "hover": "ModifyFeature_hover",
                    "symbol": "flaticon-triangular43",
                    "sortOrder": 9,
                    "isSelected": false,
                    "cursorStyle": "default",
                    "additionalOptions": {
                        'type':[{
                            'type': "Point",
                            'active': true
                        },
                            {
                                'type': "Line",
                                'active': false
                            },
                            {
                                'type': "Polygon",
                                'active': false
                            }
                        ],
                        'features':[],
                        'snappingFeatures': []
                    }
                },
                {
                    "id": "PrintBoxSelect",
                    "title": "PrintBoxSelect_title",
                    "hover": "PrintBoxSelect_hover",
                    "symbol": "flaticon-triangular43",
                    "sortOrder": 10,
                    "isSelected": false,
                    "cursorStyle": "default",
                    "additionalOptions": {
                        scale: 25000
                    }
                }
            ];

            var offlineMode = false;

            var selectTool = function(toolId){
                for (var i = 0; i < tools.length; i++){
                    if (tools[i].id === toolId){
                        tools[i].isSelected = true;
                    }else{
                        tools[i].isSelected = false;
                    }
                }
            };


            return {
                initToolbar: function(){
                    toolFactory.SetupTools(tools);
                },

                getTools: function() {
                    return tools;
                },

                getToolById: function(toolId){
                    for (var i=0; i < tools.length; i++){
                        if(tools[i].id === toolId){
                            return tools[i];
                        }
                    }
                    return undefined;
                },

                getSelectedTool: function(){
                    for (var i=0; i < tools.length; i++){
                        if (tools[i].isSelected === true){
                            return tools[i];
                        }
                    }
                },

                setSelectTool: function(toolId){
                    selectTool(toolId);
                },

                activateTool: function(tool){
                    if (tool !== undefined){
                        if(tool.id === "MeasureLine" || tool.id === "Measure" || tool.id === "AddLayerFeature" || tool.id === "ModifyFeature"){
                            //var activeLanguage = giTranslateFactory.getCurrentLanguage();
                            var options = {};

                            if (tool.id === "AddLayerFeature") {

                                var activeTool = this.getActiveFeatureType("AddLayerFeature");
                                options = {
                                    'toolType': activeTool,
                                    'snappingFeatures': tool.snappingFeatures,
                                    features: tool.additionalOptions.features
                                };
                            }else if(tool.id === "ModifyFeature"){
                                options = {
                                    'features': tool.features,
                                    'snappingFeatures': tool.snappingFeatures
                                };
                            }
                            options['translate'] = isyTranslateFactory.getTranslateOptionsByActiveLanguage();

                            toolFactory.AdditionalToolOptions(options);
                        }
                        else if (tool.additionalOptions){
                            toolFactory.AdditionalToolOptions(tool.additionalOptions);
                        }
                        toolFactory.ActivateTool(tool.id);
                        tool.isSelected = true;
                    }
                    selectTool(tool.id);
                    var mapElement = document.getElementById("mapDiv");
                    if(mapElement) {
                        mapElement.style.cursor = tool.cursorStyle;
                    }
                },

                deactivateTool: function(tool){
                    if (tool !== undefined){
                        toolFactory.DeactivateTool(tool.id);
                        tool.isSelected = false;
                    }
                },

                deactivatAllTools: function(){
                    for (var i = 0; i < tools.length; i++){
                        toolFactory.DeactivateTool(tools[i].id);
                        tools[i].isSelected = false;
                    }
                },

                getMeasureTools: function(){
                    var measureTools = [];
                    for (var i = 0; i < tools.length; i++){
                        if (tools[i].id === "Measure" || tools[i].id === "MeasureLine"){
                            measureTools.push(tools[i]);
                        }
                    }
                    return measureTools;
                },

                setOfflineStatus: function(status){
                    offlineMode = status;
                },

                getOfflineStatus: function(){
                    return offlineMode;
                },

                setAddFeatureType: function(type, id){
                    var tool = this.getToolById(id);
                    for (var i = 0; i < tool.additionalOptions.type.length; i++){
                        var toolType = tool.additionalOptions.type[i];
                        toolType.active = toolType.type === type;
                    }
                },

                getActiveFeatureType: function(id){
                    var tool = this.getToolById(id);
                    for (var i = 0; i < tool.additionalOptions.type.length; i++){
                        var toolType = tool.additionalOptions.type[i];
                        if (toolType.active){
                            return toolType.type;
                        }
                    }
                },

                setFeatures: function(features, toolId){
                    var tool = this.getToolById(toolId);
                    tool.features = features;
                },

                setSnappingFeatures: function(features, toolId){
                    var tool = this.getToolById(toolId);
                    tool.snappingFeatures = features;
                }





            };


        }]);