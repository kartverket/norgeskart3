angular.module('changeBaseMapPanel')
    .directive('changeBaseMapPanel', ['changeBaseMapPanelFactory',
        function(changeBaseMapPanelFactory) {
            return {
                templateUrl: 'components/transclusions/changeBaseMapPanel/changeBaseMapPanel.html',
                restrict: 'A',
                link: function(scope){

                    scope.allBaseMaps = function () {
                        return changeBaseMapPanelFactory.getAllBaseMaps();
                    };

                    scope.toggleBaseMap = function (id) {
                        changeBaseMapPanelFactory.setBaseMapById(id);
                    };

                    scope.activeBaseMap = function () {
                        return changeBaseMapPanelFactory.getSelectedBaseMap();
                    };

                }
            };
        }]);