angular.module('searchLagNodplakatPanelPage2')
    .directive('searchLagNodplakatPanelPage2', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagNodplakatPanel/searchLagNodplakatPanelPage2/searchLagNodplakatPanelPage2.html',
                restrict: 'A',
                link: function(){
                    // var _initModel = function () {
                    //     scope.lagNodplakatName = scope.lagNodplakatDict['elevationPoint'];
                    // };
                    // _initModel();
                }
            };
        }]);