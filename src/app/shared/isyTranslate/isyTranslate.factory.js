angular
    .module('isyTranslate')
    .factory('customLoader', function ($http, $q, translations) {
        return function (options) {
            var deferred = $q.defer();
            deferred.resolve(translations[options.key]);
            return deferred.promise;
        };
    })

    .config(function ($translateProvider) {
        $translateProvider.useLoader('customLoader', {});
        $translateProvider.use('no');
        $translateProvider.useSanitizeValueStrategy(null);
    })
    .factory('isyTranslateFactory', function() {

        var languages = [
            {
                "id": "no",
                "title": "Bokmål",
                "active": true
            },
            {
                "id": "en",
                "title": "English",
                "active": false
            }
        ];

        var translateOptions = {
            'no': {
                "east": "&Oslash; ",
                "north": "N ",
                "start_modify": "Velg objekt og starte redigering.",
                "add_layer_start_drawing": "Klikk for å starte tegning",
                "add_layer_continue_drawing": "Klikk for å fortsette å tegne.",
                "add_layer_modify_object": "Velg objekt og starte redigering.",
                "start_drawing": "Klikk for å starte tegning",
                "continue_drawing": "Klikk for å fortsette å tegne polygon. Klikk i siste punktet for å avslutte polygon.",
                "start_measure": "Klikk for å starte tegning",
                "continue_measure": "Klikk for å fortsette å tegne polygon. Klikk i siste punktet for å avslutte polygon.",
                "start_measure_line": "Klikk for å starte tegning",
                "continue_measure_line": "Klikk for å fortsette å tegne linjen. Klikk i siste punktet for å avslutte linjen."
            },
            'en': {
                "east": "E ",
                "north": "N ",
                "start_modify": "Select object and start modify.",
                "add_layer_start_drawing": "Click to start drawing",
                "add_layer_continue_drawing": "Click to continue drawing.",
                "add_layer_modify_object": "Select object and start modify.",
                "start_drawing": "Click to start drawing",
                "continue_drawing": "Click to continue drawing the polygon. Click the last point to end the polygon.",
                "start_measure": "Click to start drawing",
                "continue_measure": "Click to continue drawing the polygon. Click the last point to end the polygon.",
                "start_measure_line": "Click to start drawing",
                "continue_measure_line": "Click to continue drawing the line. Click the last point to end the line."
            }
        };

        return {
            getCurrentLanguage: function() {
                for (var i = 0; i < languages.length; i++) {
                    if (languages[i].active === true) {
                        return languages[i];
                    }
                }
            },

            getAllLanguages: function() {
                return languages;
            },

            setCurrentLanguage: function(id) {
                for (var i = 0; i < languages.length; i++) {
                    if (languages[i].id === id) {
                        languages[i].active = true;
                    } else {
                        languages[i].active = false;
                    }
                }
            },

            getTranslateOptionsByActiveLanguage: function(){
                return translateOptions[this.getCurrentLanguage().id];
            }
        };
    });