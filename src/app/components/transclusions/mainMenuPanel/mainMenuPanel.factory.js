angular
    .module('mainMenuPanel')
    .factory('mainMenuPanelFactory', [
        function() {

            var projects = [
                {
                    "id": "norgeskart",
                    "title": "Friluft_title",
                    "symbol": "material-icons",
                    "symbol_text": "terrain",
                    "isSelected" : false
                },
                {
                    "id": "ssr",
                    "title": "Stedsnavn_title",
                    "symbol": "fa fa-map-signs",
                    "symbol_text": "",
                    "isSelected" : false
                },
                {
                    "id": "Tilgjengelighet",
                    "title": "Tilgjengelighet_title",
                    "symbol": "fa fa-wheelchair",
                    "symbol_text": "",
                    "isSelected" : false
                },
                {
                    "id": "Fastmerker",
                    "title": "Fastmerker_title",
                    "symbol": "material-icons",
                    "symbol_text": "nature",
                    "isSelected" : false
                },
                {
                    "id": "nrl",
                    "title": "Luftfartshindre_title",
                    "symbol": "icon-airplane",
                    "symbol_text": "",
                    "isSelected" : false
                }
            ];


            return {


                getAllProjects: function(){
                    return projects;
                },

                getSelectedProject: function () {
                    for (var i = 0; i < projects.length; i++){
                        if (projects[i].isSelected){
                            return projects[i];
                        }
                    }
                },

                setProjectById: function (id) {
                    if (id !== undefined){
                        for (var i = 0; i < projects.length; i++){
                            projects[i].isSelected = projects[i].id.toLowerCase() === id.toLowerCase();
                        }
                    }
                }
            };


        }]);