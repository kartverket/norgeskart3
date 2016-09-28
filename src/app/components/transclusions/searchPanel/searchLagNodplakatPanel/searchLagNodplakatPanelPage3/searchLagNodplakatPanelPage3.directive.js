angular.module('searchLagNodplakatPanelPage3')
    .directive('searchLagNodplakatPanelPage3', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagNodplakatPanel/searchLagNodplakatPanelPage3/searchLagNodplakatPanelPage3.html',
                restrict: 'A',
                controller: 'searchLagNodplakatPanelPage3Controller',
                link: function (scope) {
                    scope.printIframe = function () {
                        var PDF = document.getElementById('emergencyPoster');
                        PDF.focus();
                        PDF.contentWindow.print();
                    };
                }
            };
        }]);