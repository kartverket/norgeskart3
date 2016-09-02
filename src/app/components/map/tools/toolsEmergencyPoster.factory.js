angular
    .module('tools')
    .factory('toolsEmergencyPosterFactory', ['mainAppService',
        function(mainAppService) {

            var emergencyPosterConfig = {
                'locationName': '',
                'position1': '',
                'position2': '',
                'street': '',
                'place':'',
                'matrikkel':'',
                'utm':'',
                'posDez':'',
                'map':''
            };


            return {

                generateEmergancyPoster: function () {
                    mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
                },

                getEmergencyPosterConfig: function () {
                    return emergencyPosterConfig;
                },

                updateEmergencyPosterConfig: function (config) {
                    emergencyPosterConfig = config;
                }

            };
        }]);
