angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                restrict: 'A',
                link: function(scope){
                    scope.openNav = function() {
                        document.getElementById("mySidenav").style.width = "395px";
                        document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
                        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
                    };

                    scope.closeNav = function() {
                        document.getElementById("mySidenav").style.width = "0";
                        document.getElementById("main").style.backgroundColor = "transparent";
                        // document.body.style.backgroundColor = "white";
                    };
                }
            };
        }]);