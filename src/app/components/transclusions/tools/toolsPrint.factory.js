angular
    .module('tools')
    .factory('toolsPrint', ['mainAppService', '$http', '$q',
        function (mainAppService, $http, $q) {
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side

            var _createAjaxCall = function(type, url, dataBody, dataType){
                if (dataType === undefined){
                    dataType = 'application/json';
                }
                var deffered = $q.defer();
                $.ajax({
                    type: type,
                    url: url,
                    async: true,
                    cache: false,
                    contentType: dataType,
                    data: dataBody,
                    success: function (result) {
                        deffered.resolve(result);
                    },
                    error: function (error) {
                        deffered.reject(error);
                    }
                });
                return deffered.promise;
            };

            var _getPrintCapabilities = function(appId) {
                var urlPrintCapabilities = mainAppService.generateUrlPrintCapabilities(appId);
                return _createAjaxCall('GET', urlPrintCapabilities);
            };

            var _uploadDataForPrint = function(appId, data){
                var urlPrint = mainAppService.generatePrintUrl(appId);
                var jsonData = JSON.stringify(data);
                return _createAjaxCall("POST", urlPrint, jsonData);
            };

            var _getStatusUrl = function(url){
                var urlStatus = mainAppService.generateStatusPrintDownloadUrl(url);
                return _createAjaxCall("GET", urlStatus);
            };

            var _cancelPrint = function(refNum){
                var urlCancelPrint = mainAppService.generateCancelPrintUrl(refNum);
                return _createAjaxCall("DELETE", urlCancelPrint, undefined, 'text');
            };

            return {
                getPrintCapabilities: function(appId){
                    return _getPrintCapabilities(appId);
                },
                
                uploadDataForPrint: function(appId, data){
                    return _uploadDataForPrint(appId, data);
                },

                getStatusPrint: function(url){
                    return _getStatusUrl(url);
                },

                cancelPrint: function(refNum){
                    return _cancelPrint(refNum);
                }

            };
        }
    ]);
