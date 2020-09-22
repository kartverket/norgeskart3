angular.module('mainMenuSections')
  .directive('mainMenuSections', ['mainMenuPanelFactory', '$location', 'ISY.MapAPI.Map', 'isyTranslateFactory', '$translate', 'localStorageFactory', '$timeout',
    function (mainMenuPanelFactory, $location, map, isyTranslateFactory, $translate, localStorageFactory, $timeout) {
      return {
        templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
        restrict: 'A',
        link: function (scope) {
          scope.projects = mainMenuPanelFactory.getAllProjects();
          scope.languages = isyTranslateFactory.getAllLanguages();

          scope.activateProject = function (project) {
            scope.visibleLayersCount = 0;
            if (project.isSelected) {
              scope.showMainMenuGroupLayers();
            } else {
              mainMenuPanelFactory.setProjectById(project.id);
              var search = $location.search();
              search['project'] = project.id;
              search.layers = "";
              setSearch(map.GetUrlObject(), search.layers, project);
            }
          };

          var setSearch = function (obj, layers, project) {
            if (!angular.equals(obj, $location.search())) {
              var newSearch = angular.extend($location.search(), obj);
              newSearch.layers = layers;
              $location.search(newSearch).replace();
              $timeout(function () {
                  scope.resetMainAppFactory();
                  scope.initMapLayout();
                  scope.reInitMap();
                  map.RedrawMap();
                  scope.getVisibleLayersCount();
                  scope.activateProject(project);
              }, 0);
            }
          };

          scope.changeLanguage = function (langId) {
            isyTranslateFactory.setCurrentLanguage(langId);
            map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
            $translate.use(langId);
            localStorageFactory.set("activeLanguage", langId);
          };

          scope.getVisibleLayersCount = function() {
            return map.GetVisibleSubLayers().length;
          };

          $(document).ready(function () {
            scope.getVisibleLayersCount();
          });

          /*Print start*/
          function printMap() {
            var cnv = document.getElementsByClassName("print-mode")[0];
            var scrollHeight = cnv.scrollHeight;
            var scrollWidth = cnv.scrollWidth;

            //A4 aspect ratio is 0.707070:1
            var widthInRatio = scrollHeight * 0.707070;
            //cnv.style.width = scrollWidth+"px";
            if (scrollWidth > widthInRatio) {
              cnv.style.width = (scrollWidth) + "px";
              cnv.style.height = scrollHeight + "px";
            }
          }

          function afterPrint() {
            var cnv = document.getElementsByClassName("print-mode")[0];
            cnv.style.height = 100 + "%";
            cnv.style.width = 100 + "%";
            map.RedrawMap();
          }

          scope.printMap = function () {
            var objPrintPreview = '<object id="printPrev" width="0" height="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
            document.body.insertAdjacentHTML('beforeEnd', objPrintPreview);
            try {
              printPrev.ExecWB(7, 2);
              printPrev.outerHTML = "";
            } catch (err) {
                console.error(err);
            }

            printMap();
            window.print();
            afterPrint();
          };

          window.matchMedia('print').addListener(function () {
            printMap();
            setTimeout(function () {
              afterPrint();
            }, 1);
          });

          $(window).on('beforeprint', function () {
            printMap();
          });

          $(window).on('afterprint', function () {
            afterPrint();
          });
          /*Print end*/
        }
      };
    }
  ]);
