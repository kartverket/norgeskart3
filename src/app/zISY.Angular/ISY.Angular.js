angular.module("ISY.Angular", [
    "ISY.Angular.MapAPI",
    "ISY.Angular.MapImplementation"
])
    .service('ISY.CustomMapConfig', ['$location', '$window', ISY.CustomMapConfig])

    // MapGUI
    .service("ISY.ConfigFacade", [ISY.Facade.ServerConfigFacade])
    .service("ISY.EventHandler", [ISY.Events.EventHandler])

    .service("ISY.Repository", ["ISY.ConfigFacade", "ISY.EventHandler", ISY.Repository.ConfigRepository]);


// OL3
angular.module("ISY.Angular.MapAPI", [])
    .service("ISY.MapAPI.Map", ["ISY.MapImplementation.Map", "ISY.EventHandler", "ISY.MapAPI.FeatureInfo",  "ISY.MapAPI.Layers", "ISY.MapAPI.Groups", "ISY.MapAPI.Categories", ISY.MapAPI.Map])
    .service("ISY.MapAPI.FeatureInfo", ["ISY.MapImplementation.Map", "$http", "ISY.EventHandler", "ISY.MapAPI.Parsers.Base", ISY.MapAPI.FeatureInfo])
    .service("ISY.MapAPI.Layers", ["ISY.MapImplementation.Map", ISY.MapAPI.Layers])
    .service("ISY.MapAPI.Groups", [ISY.MapAPI.Groups])
    .service("ISY.MapAPI.Categories", [ISY.MapAPI.Categories])
    .service("ISY.MapAPI.Tools.Tools", ["ISY.MapAPI.Map", "ISY.EventHandler", ISY.MapAPI.Tools.Tools])
    .service("ISY.MapAPI.Tools.ToolFactory", ["ISY.MapImplementation.Map", "ISY.MapAPI.Tools.Tools", ISY.MapAPI.Tools.ToolFactory])
    .service("ISY.MapAPI.Parsers.Base", ["ISY.MapAPI.Parsers.Factory", ISY.MapAPI.Parsers.Base])
    .service("ISY.MapAPI.Parsers.GeoJSON", [ISY.MapAPI.Parsers.GeoJSON])
    .service("ISY.MapAPI.Parsers.GML", [ISY.MapAPI.Parsers.GML])
    .service("ISY.MapAPI.Parsers.KartKlifNo", [ISY.MapAPI.Parsers.KartKlifNo])
    .service("ISY.MapAPI.Parsers.FiskeriDir", ["ISY.MapImplementation.OL3.Utilities", ISY.MapAPI.Parsers.FiskeriDir])
    .service("ISY.MapAPI.Parsers.Factory",
    [
        "ISY.MapAPI.Parsers.GeoJSON",
        "ISY.MapAPI.Parsers.GML",
        "ISY.MapAPI.Parsers.KartKlifNo",
        "ISY.MapAPI.Parsers.FiskeriDir",
        ISY.MapAPI.Parsers.Factory
    ]);
angular.module("ISY.Angular.MapImplementation", [])
    .service("ISY.MapImplementation.Map", ["ISY.Repository", "ISY.EventHandler", "$http", "ISY.MapImplementation.OL3.Measure", "ISY.MapImplementation.OL3.FeatureInfo", "ISY.MapImplementation.OL3.Export", "ISY.MapImplementation.OL3.HoverInfo","ISY.MapImplementation.OL3.MeasureLine", "ISY.MapImplementation.OL3.DrawFeature", "ISY.MapImplementation.OL3.Offline", "ISY.MapImplementation.OL3.AddLayerFeature", "ISY.MapImplementation.OL3.ModifyFeature", "ISY.MapImplementation.OL3.AddFeatureGps", "ISY.MapImplementation.OL3.PrintBoxSelect", "ISY.MapImplementation.OL3.AddLayerUrl", ISY.MapImplementation.OL3.Map])
    .service("ISY.MapImplementation.OL3.Utilities", [ISY.MapImplementation.OL3.Utilities])
    .service("ISY.MapImplementation.OL3.Measure", ["ISY.EventHandler", ISY.MapImplementation.OL3.Measure])
    .service("ISY.MapImplementation.OL3.FeatureInfo", [ISY.MapImplementation.OL3.FeatureInfo])
    .service("ISY.MapImplementation.OL3.Export", [ISY.MapImplementation.OL3.Export])
    .service("ISY.MapImplementation.OL3.HoverInfo", [ISY.MapImplementation.OL3.HoverInfo])
    .service("ISY.MapImplementation.OL3.MeasureLine", ["ISY.EventHandler", ISY.MapImplementation.OL3.MeasureLine])
    .service("ISY.MapImplementation.OL3.DrawFeature", ["ISY.EventHandler", ISY.MapImplementation.OL3.DrawFeature])
    .service("ISY.MapImplementation.OL3.Offline", [ISY.MapImplementation.OL3.Offline])
    .service("ISY.MapImplementation.OL3.AddLayerFeature", ["ISY.EventHandler", ISY.MapImplementation.OL3.AddLayerFeature])
    .service("ISY.MapImplementation.OL3.ModifyFeature", ["ISY.EventHandler", ISY.MapImplementation.OL3.ModifyFeature])
    .service("ISY.MapImplementation.OL3.AddFeatureGps", ["ISY.EventHandler", ISY.MapImplementation.OL3.AddFeatureGps])
    .service("ISY.MapImplementation.OL3.PrintBoxSelect", ["ISY.EventHandler", ISY.MapImplementation.OL3.PrintBoxSelect])
    .service("ISY.MapImplementation.OL3.AddLayerUrl", [ISY.MapImplementation.OL3.AddLayerUrl]);

/*
 // Leaflet
 angular.module("ISY.Angular.MapAPI", [])
 .service("ISY.MapAPI.Map", ["ISY.MapImplementation.Map", "ISY.EventHandler", "ISY.MapAPI.FeatureInfo", "ISY.MapAPI.Layers", "ISY.MapAPI.Groups", ISY.MapAPI.Map])
 .service("ISY.MapAPI.FeatureInfo", ["ISY.MapImplementation.Map", "$http", "ISY.EventHandler", "ISY.MapAPI.Parsers.Base", ISY.MapAPI.FeatureInfo])
 .service("ISY.MapAPI.Layers", ["ISY.MapImplementation.Map", ISY.MapAPI.Layers])
 .service("ISY.MapAPI.Groups", [ISY.MapAPI.Groups])
 .service("ISY.MapAPI.Tools.Tools", ["ISY.MapAPI.Map", "ISY.EventHandler", ISY.MapAPI.Tools.Tools])
 .service("ISY.MapAPI.Tools.ToolFactory", ["ISY.MapAPI.Tools.Tools", ISY.MapAPI.Tools.ToolFactory])
 .service("ISY.MapAPI.Parsers.Base", ["ISY.MapAPI.Parsers.Factory", ISY.MapAPI.Parsers.Base])
 .service("ISY.MapAPI.Parsers.GeoJSON", [ISY.MapAPI.Parsers.GeoJSON])
 .service("ISY.MapAPI.Parsers.GML", [ISY.MapAPI.Parsers.GML])
 .service("ISY.MapAPI.Parsers.KartKlifNo", [ISY.MapAPI.Parsers.KartKlifNo])
 .service("ISY.MapAPI.Parsers.Factory",
 [
 "ISY.MapAPI.Parsers.GeoJSON",
 "ISY.MapAPI.Parsers.GML",
 "ISY.MapAPI.Parsers.KartKlifNo",
 ISY.MapAPI.Parsers.Factory
 ]);

 angular.module("ISY.Angular.MapImplementation", [])
 .service("ISY.MapImplementation.Map", ["ISY.Repository", "ISY.EventHandler", "$http", ISY.MapImplementation.Leaflet.Map])
 .service("ISY.MapImplementation.OL3.FeatureInfo", [ISY.MapImplementation.OL3.FeatureInfo]);
 */
