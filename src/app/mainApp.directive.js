angular.module('mainApp')
    .directive('mainApp', [
        function() {
            return {
                templateUrl: 'mainAppBody.html',
                link: function (scope) {
                    //remove if scope function is implemented
                    if (false){
                        console.log(scope);
                    }
                }
            };
        }
    ]);
