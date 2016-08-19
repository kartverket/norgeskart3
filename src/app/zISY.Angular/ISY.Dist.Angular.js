/* DON'T CHANGE THE FILE NAME, GRUNTFILE.JS DEPENDS ON THE NAME */

angular.module('ISY.Angular')
    .service('ISY.ApiController', ['ISY.CustomMapConfig', ISY.ApiController.DistVersion])
    .constant('Environment', 'dist');