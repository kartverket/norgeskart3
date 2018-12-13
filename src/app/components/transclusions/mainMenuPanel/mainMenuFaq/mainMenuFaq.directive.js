angular.module('mainMenuFaq')
    .directive('mainMenuFaq', [
        function() {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuFaq/mainMenuFaq.html',
                restrict: 'A',
                controller: 'mainMenuFaqController',
                link: function(scope){

                    scope.toggleItem = function(i){
                        scope.selectedItem = scope.selectedItem === i ? undefined : i;
                    };

                }
            };
        }]);