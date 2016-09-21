angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                restrict: 'A',
                link: function(scope){
                    scope.openNav = function() {
                        document.getElementById("mySidenav").style.width = "250px";
                    };

                    scope.closeNav = function() {
                        document.getElementById("mySidenav").style.width = "0";
                    };
                }
            };
        }]);