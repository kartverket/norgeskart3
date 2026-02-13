angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope', 'moveableOverlayFactory','mapOverlaysLayoutFactory', 'localStorageFactory', 'ISY.MapAPI.Map', 'mainAppService', '$http', '$timeout',
        function($scope, moveableOverlayFactory, mapOverlaysLayoutFactory, localStorageFactory, map, mainAppService, $http, $timeout) {

            $scope.drawActivated=false;

            $scope.mainMenuPanelLayout = "mainMenuSections";

            $scope.resetApplication = function ($event) {
                $event.preventDefault();
                localStorageFactory.remove('lat');
                localStorageFactory.remove('lon');
                localStorageFactory.remove('zoom');
                localStorageFactory.set('mainMenuIsOpen', false);
                location.hash = '';
                location.reload($event.shiftKey);
            };

            $scope.showMainMenuBaseLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuBaseLayers";
            };

            $scope.showMainMenuSections = function () {
                $scope.mainMenuPanelLayout = "mainMenuSections";
            };

            $scope.showMainMenuGroupLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuGroupLayers";
            };

            $scope.showMainMenuContact = function () {
              $scope.mainMenuPanelLayout = "mainMenuContact";
            };

            $scope.showMainMenuPrivacy = function() {
                $scope.mainMenuPanelLayout = "mainMenuPrivacy";
            };

            $scope.showMainMenuFaq = function () {
                $scope.mainMenuPanelLayout = "mainMenuFaq";
            };

            function _setActiveMoveableMenu(menuName) {
                mapOverlaysLayoutFactory.setShowSearchOverlay(false);
                moveableOverlayFactory.deactiveAllOverlay();
                moveableOverlayFactory.setActiveOverlay(menuName);
                $scope.menuShowMoveableOverlay(menuName);
            }

            $scope.moveableOverlayLayout = "";

            $scope.showMoveableDrawMenu = function () {
                _setActiveMoveableMenu("DrawMenu");
            };

            $scope.showMoveableShareMapMenu = function () {
                $scope.moveableOverlayLayout = "menuShareMapLayout";
                _setActiveMoveableMenu("ShareMap");
            };

            $scope.showMoveableElevationProfileMenu = function () {
                $scope.moveableOverlayLayout = "menuElevationProfileLayout";
                _setActiveMoveableMenu("ElevationProfile");
            };

            $scope.showMoveablePrintMenu = function() {
                $scope.moveableOverlayLayout = "menuPrintLayout";
                _setActiveMoveableMenu("PrintMenu");
            };

            $scope.deactivateMoveableOverlay = function(){
                $scope.moveableOverlayLayout = "";
            };

            $scope.isDrawActivated = function () {
                if($scope.drawActivated){
                    return true;
                }
                else {
                    $scope.drawActivated=true;
                    return false;
                }
            };

            $scope.setGeoJSON = function (GeoJSON) {
                $scope.GeoJSON=GeoJSON;
            };

            $scope.getSelectedBaseLayerName = function () {
                var firstVisBaseLayer = map.GetFirstVisibleBaseLayer();
                if (firstVisBaseLayer !== undefined){
                    return firstVisBaseLayer.name;
                }else{
                    return "";
                }
            };

            // Initialize message properties
            $scope.message = '';
            $scope.messageType = 'info'; // Can be 'info', 'warning', or 'error'
            $scope.messageHistory = []; // Array to store message history
            $scope.showMessageHistory = false;
            $scope.isMinimized = false; // Track if message is minimized

            // Function to show a message with type
            $scope.showMessage = function(message, type) {
                $scope.message = message;
                $scope.messageType = type || 'info';
                $scope.isMinimized = false; // Reset minimized state when showing new message
            };

            // Function to minimize/maximize the message
            $scope.toggleMinimize = function() {
                $scope.isMinimized = !$scope.isMinimized;
            };

            // Function to dismiss the message
            $scope.dismissMessage = function() {
                // Add the current message to history if it's not empty
                if ($scope.message) {
                    $scope.messageHistory.unshift({
                        text: $scope.message,
                        type: $scope.messageType,
                        timestamp: new Date()
                    });

                    // Limit history to last 10 messages
                    if ($scope.messageHistory.length > 10) {
                        $scope.messageHistory.pop();
                    }
                }

                // Add the fade-out class
                $scope.isClosing = true;

                // After animation completes, remove the message
                $timeout(function() {
                    $scope.message = '';
                    $scope.isClosing = false;
                    $scope.isMinimized = false;
                }, 500); // Match animation duration (500ms)
            };

            // Function to toggle message history display
            $scope.toggleMessageHistory = function() {
                $scope.showMessageHistory = !$scope.showMessageHistory;

                // If opening history and message is minimized, maximize it
                if ($scope.showMessageHistory && $scope.isMinimized) {
                    $scope.isMinimized = false;
                }
            };

            // Function to restore a message from history
            $scope.restoreMessage = function(historyItem) {
                $scope.message = historyItem.text;
                $scope.messageType = historyItem.type;
                $scope.showMessageHistory = false;
            };

            //var currentLanguage = isyTranslateFactory.getCurrentLanguage();
            //var languageId = currentLanguage.id || 'no';
            var languageId = 'no';
            var url = mainAppService.messagesUrl(languageId);

            function escapeHtml(value) {
                return value
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            }

            function renderMessageMarkdown(markdown) {
                if (!markdown) {
                    return '';
                }

                var boldRegex = /\*\*([^*]+)\*\*/g;
                var linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

                return markdown.split(/\r?\n/).map(function(line) {
                    var headerMatch = line.match(/^(#{1,3})\s+(.*)$/);
                    var content = headerMatch ? headerMatch[2] : line;
                    var escapedContent = escapeHtml(content);
                    var withBold = escapedContent.replace(boldRegex, '<strong>$1</strong>');
                    var withLinks = withBold.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

                    if (headerMatch) {
                        var level = headerMatch[1].length;
                        return '<h' + level + '>' + withLinks + '</h' + level + '>';
                    }

                    return withLinks;
                }).join('<br>');
            }

            $http.get(url)
                .then(function (response) {
                $scope.message = renderMessageMarkdown(response.data);
            })
            .catch(function(response){
                console.info('Messages response is: ', response.data);
            })

        }
    ]);
