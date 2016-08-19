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
    })
    .factory('isyTranslateFactory', function() {

        var languages = [
            {
                "id": "no",
                "title": "norwegian_txt",
                "active": true
            },
            {
                "id": "en",
                "title": "english_txt",
                "active": false
            }
        ];

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
            }
        };
    });