angular.module('searchKoordTransPanel')
  .directive('searchKoordTransPanel', ['$window',
    function ($window) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchKoordTransPanel/searchKoordTransPanel.html',
        restrict: 'A',
        link: function () {
          var setMenuListMaxHeight = function () {
            $(document).ready(function () {
              var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
              if (isMobile.matches) {
                fixElementHeight(120);
              } else {
                fixElementHeight(220);
              }
            });
          };

          function fixElementHeight(moveUpFromBottom) {
            var bodyHeight = $window.innerHeight;
            var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
            var searchContentElements = document.getElementsByClassName("search-content");
            for (var i = 0; i < searchContentElements.length; i++) {
              var element = searchContentElements[i];
              element.style.maxHeight = menuListMaxHeight + 'px';
            }
          }

          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();
          });

          // // hold onto the drop down menu
          // var dropdownMenu;
          //
          // // and when you show it, move it to the body
          // $(window).on('show.bs.dropdown', function (e) {
          //
          //     // grab the menu
          //     dropdownMenu = $(e.target).find('.dropdown-menu');
          //
          //     // detach it and append it to the body
          //     $('body').append(dropdownMenu.detach());
          //
          //     // grab the new offset position
          //     var eOffset = $(e.target).offset();
          //
          //     // make sure to place it where it would normally go (this could be improved)
          //     dropdownMenu.css({
          //         'display': 'block',
          //         'top': eOffset.top + $(e.target).outerHeight(),
          //         'left': eOffset.left
          //     });
          // });
          //
          // // and when you hide it, reattach the drop down, and hide it normally
          // $(window).on('hide.bs.dropdown', function (e) {
          //     $(e.target).append(dropdownMenu.detach());
          //     dropdownMenu.hide();
          // });

        }
      };
    }
  ]);
