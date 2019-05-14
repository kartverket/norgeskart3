angular.module('menuPrint')
    .directive('menuPrint', [
        function () {
            return {
                templateUrl: 'components/transclusions/menuPrint/menuPrint.html',                
                restrict: 'A',
                controller: 'menuPrintController',
                link: function () {
                }
            };
        }
    ]);
