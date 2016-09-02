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

            // var poster;

            return {

                generateEmergancyPoster: function () {
                    // console.log("Generating emergency poster...");
                    // $.ajax({
                    //     type: "GET",
                    //     url: mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig),
                    //     async: false,
                    //     success: function (result) {
                    //         poster = result;
                    //     },
                    //     error: function (error) {
                    //         console.log("generateEmergancyPoster error: ", error);
                    //     }
                    // });
                    return mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
                },

                getEmergencyPosterConfig: function () {
                    return emergencyPosterConfig;
                },

                updateEmergencyPosterConfig: function (config) {
                    emergencyPosterConfig = config;
                }

                // getEmergencyPoster: function () {
                //     return poster;
                // }

            };
        }]);
