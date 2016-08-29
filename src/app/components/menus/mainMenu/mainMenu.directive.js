angular.module('mainMenu')
    .directive('mainMenu', [
        function() {
            return {
                templateUrl: 'components/menus/mainMenu/mainMenu.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);