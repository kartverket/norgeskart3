angular.module('mainMenuSections')
    .directive('mainMenuSections', ['mainMenuPanelFactory','$location','ISY.MapAPI.Map',
        function(mainMenuPanelFactory, $location, map) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(scope){
                    scope.projects = mainMenuPanelFactory.getAllProjects();

                    scope.activateProject = function (project) {
                        if (project.isSelected){
                            scope.showMainMenuGroupLayers();
                        }else{
                            mainMenuPanelFactory.setProjectById(project.id);
                            var search = $location.search();
                            search['project'] = project.id;
                            console.log("Search: ", search, "projectId: ", project.id);
                            setSearch(map.GetUrlObject());
                        }
                    };

                    var setSearch = function (obj) {
                        if (!angular.equals(obj, $location.search())) {
                            var newSearch = angular.extend($location.search(), obj);
                            $location.search(newSearch);
                            location.reload();
                        }
                    };

                    // scope.getSelectedLanguageStyle = function (languageId) {
                    //     if (languageId.isVisible){
                    //         return 'glyphicon glyphicon-ok-sign pointer-cursor';
                    //     }else{
                    //         return 'icon-radio-unchecked pointer-cursor';
                    //     }
                    // };
                }
            };
        }]);