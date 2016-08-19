var ISY = ISY || {};
ISY.ApiController = ISY.ApiController || {};

ISY.ApiController.BuildVersion= function(customMapConfig){
    var apiPathPrefix = 'assets/';

    var configName = customMapConfig.GetConfigName();

    function getGeoInnsynConfig(){
        return getConfigPath() + configName + '.xml';
    }

    function getLayerStatus(){
        return getConfigPath() + 'LayerStatus.json';
    }

    function getDefaultMarkerPath(){
        return apiPathPrefix + 'img/pin-md-red.png';
    }

    function getDefaultWinMapIco(){
        return apiPathPrefix + 'img/WinMap_64.png';
    }

    function getConfigPath(){
        return apiPathPrefix + 'mapConfig/';
    }

    return {
        GetGeoInnsynConfig: getGeoInnsynConfig,
        GetLayerStatus: getLayerStatus,
        GetDefaultMarkerPath: getDefaultMarkerPath,
        GetDefaultWinMapIco: getDefaultWinMapIco,
        GetConfigPath: getConfigPath
    };
};

ISY.ApiController.DistVersion = function(customMapConfig){
    var baseUrl = 'http://geoinnsyn.nois.no/';
    var apiPathPrefix = 'api/v1/';

    var defaultMapConfig = 'demo';

    var configName = customMapConfig.GetConfigName() === undefined ? defaultMapConfig : customMapConfig.GetConfigName();

    function getGeoInnsynConfig(){
        return getConfigPath() + configName;
    }

    function getLayerStatus(){
        return getConfigPath() + configName + '/status';
    }

    function getDefaultMarkerPath(){
        return baseUrl + 'assets/img/pin-md-red.png';
    }

    function getConfigList() {
        return getConfigPath() + 'list';
    }

    function getConfigPath(){
        return baseUrl + apiPathPrefix + 'mapConfig/';
    }

    return {
        GetGeoInnsynConfig: getGeoInnsynConfig,
        GetLayerStatus: getLayerStatus,
        GetDefaultMarkerPath: getDefaultMarkerPath,
        GetConfigList: getConfigList,
        GetConfigPath: getConfigPath
    };
};