angular.module('mainApp')
    .service('mainAppService', ['$http',
            function(){
                var url = 'http://www.norgeskart.no/';

                this.uploadGpxFile = function () {
                    return url + 'ws/upload-gpx.py';
                };
            }
        ]
    );
