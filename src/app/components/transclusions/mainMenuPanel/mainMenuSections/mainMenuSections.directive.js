angular.module('mainMenuSections')
    .directive('mainMenuSections', ['mainMenuPanelFactory','$location','ISY.MapAPI.Map','isyTranslateFactory','$translate', 'localStorageFactory', '$timeout',
        function(mainMenuPanelFactory, $location, map, isyTranslateFactory, $translate, localStorageFactory, $timeout) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(scope){
                    scope.projects = mainMenuPanelFactory.getAllProjects();
                    scope.languages = isyTranslateFactory.getAllLanguages();

                    scope.activateProject = function (project) {
                        if (project.isSelected){
                            scope.showMainMenuGroupLayers();
                        }else{
                            mainMenuPanelFactory.setProjectById(project.id);
                            var search = $location.search();
                            search['project'] = project.id;
                            search.layers = "";
                            setSearch(map.GetUrlObject(), search.layers);
                        }
                    };

                    var setSearch = function (obj, layers) {
                        if (!angular.equals(obj, $location.search())) {
                            var newSearch = angular.extend($location.search(), obj);
                            newSearch.layers = layers;
                            $location.search(newSearch);
                            $timeout(function () {
                                window.location.reload();
                            }, 0);
                        }
                    };

                    scope.getSelectedLanguageStyle = function (active) {
                        if (active){
                            return 'glyphicon glyphicon-ok-sign pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    scope.changeLanguage = function (langId) {
                        isyTranslateFactory.setCurrentLanguage(langId);
                        map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                        $translate.use(langId);
                        localStorageFactory.set("activeLanguage", langId);
                    };

                    // scope.getSelectedBaseLayerName = function () {
                    //     if (map.GetFirstVisibleBaseLayer() !== undefined){
                    //         return map.GetFirstVisibleBaseLayer().name;
                    //     }else{
                    //         return "";
                    //     }
                    // };
                }
            };
        }]);