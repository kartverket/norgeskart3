angular.module('searchSeEiendomPanel')
    .directive('searchSeEiendomPanel', ['$window', 'mainAppService','$http',
        function($window, mainAppService, $http) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchSeEiendomPanel/searchSeEiendomPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.openEindomInformasjon = function () {
                        // $window.open(scope.searchOptionsDict['seEiendom'].url, '_blank');
                        var eiendomUrl = scope.searchOptionsDict['seEiendom'].url;
                        var iframeWidth = 0;
                        var iframeHeight = 0;
                        var bodyHeight = $window.innerHeight;
                        var bodyWidth = $window.innerWidth;
                        var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                        if (isMobile.matches) {
                            iframeHeight = Math.floor(bodyHeight - 70);
                            iframeWidth = Math.floor(bodyWidth - 50);
                        }else{
                            iframeHeight = Math.floor(bodyHeight - 300);
                            iframeWidth = Math.floor(bodyWidth - 300);
                        }

                        $.featherlight({iframe: eiendomUrl, iframeMaxWidth: '100%', iframeWidth: iframeWidth,
                            iframeHeight: iframeHeight});
                    };

                    var setMenuListMaxHeight = function () {
                        $(document).ready(function() {
                            var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                            if (isMobile.matches) {
                                fixElementHeight(120);
                            }else{
                                fixElementHeight(220);
                            }
                        });
                    };

                    function fixElementHeight(moveUpFromBottom){
                        var bodyHeight = $window.innerHeight;
                        var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
                        var searchContentElements = document.getElementsByClassName("search-content");
                        for (var i = 0; i < searchContentElements.length; i++){
                            var element = searchContentElements[i];
                            element.style.maxHeight = menuListMaxHeight + 'px';
                        }
                    }

                    var _getEiendomAdresse = function () {
                        var komunenr =scope.searchOptionsDict['seEiendom'].kommunenr;
                        var gardsnr = scope.searchOptionsDict['seEiendom'].gardsnr;
                        var bruksnr = scope.searchOptionsDict['seEiendom'].bruksnr;
                        var url = mainAppService.generateEiendomAdress(komunenr, gardsnr, bruksnr);
                        $http.get(url).then(function (response) {
                            scope.vegaddresse = '';
                            scope.kommuneNavn = '';
                            scope.cityName = '';
                            var addressNum = [];
                            var responseData = response.data;
                            for (var i = 0; i < responseData.length; i++){
                                var adressWithNum = responseData[i].VEGADRESSE2.split(" ");
                                if (scope.vegaddresse === ''){
                                    scope.vegaddresse = adressWithNum[0];
                                }
                                if (scope.kommuneNavn === ''){
                                    scope.kommuneNavn = responseData[i].KOMMUNENAVN;
                                }
                                if (scope.cityName === ''){
                                    scope.cityName = responseData[i].VEGADRESSE[1];
                                }
                                addressNum.push(adressWithNum[adressWithNum.length - 1]);
                            }

                            addressNum.sort(function(a, b){
                                if(a < b){
                                    return -1;
                                }
                                if(a > b){
                                    return 1;
                                }
                                return 0;
                            });

                            for (var j = 0; j < addressNum.length; j++){
                                if (j === 0){
                                    scope.vegaddresse += " " + addressNum[j];
                                }else{
                                    if (addressNum[j] !== ""){
                                        scope.vegaddresse += ", " + addressNum[j];
                                    }
                                }
                            }
                        });
                    };

                    $( document ).ready(function() {
                        $($window).resize(setMenuListMaxHeight);
                        setMenuListMaxHeight();
                        _getEiendomAdresse();
                    });
                }
            };
        }]);