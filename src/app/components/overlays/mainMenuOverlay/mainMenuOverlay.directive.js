angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', ['localStorageFactory',
        function(localStorageFactory) {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                restrict: 'A',
                link: function(scope){

                    scope.openNav = function() {
                        document.getElementById("mySidenav").style.width = "395px";
                        document.getElementById("mySidenav").style.overflowY = "auto";
                        document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
                        document.getElementById("main").style.transition = "0.4s";
                        // document.getElementById("sidemenupanel").style.transition = "0.4s";
                        // document.getElementById("sidemenupanel").style.width = "395px";
                        // document.getElementById("sidemenupanel").style.position = "fixed";

                        localStorageFactory.set("mainMenuIsOpen", true);
                        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
                    };

                    scope.closeNav = function() {
                        document.getElementById("mySidenav").style.width = "0";
                        document.getElementById("mySidenav").style.overflowY = "hidden";
                        document.getElementById("main").style.backgroundColor = "transparent";
                        document.getElementById("main").style.transition = "0.4s";
                        // document.getElementById("sidemenupanel").style.transition = "0.5s";
                        // document.getElementById("sidemenupanel").style.width = "0";
                        // document.getElementById("sidemenupanel").style.position = "fixed";
                        // document.getElementById("sidemenupanel").style.position = "absolute";
                        localStorageFactory.set("mainMenuIsOpen", false);
                        // document.body.style.backgroundColor = "white";
                    };

                    function _initMainMenuOverlay() {
                        var isMainMenuOpen = localStorageFactory.get("mainMenuIsOpen");
                        if (isMainMenuOpen !== null){
                            if (isMainMenuOpen){
                                scope.openNav();
                            }else{
                                scope.closeNav();
                            }
                        }
                    }
                    $( document ).ready(function() {
                        _initMainMenuOverlay();
                    });
                }
            };
        }]);