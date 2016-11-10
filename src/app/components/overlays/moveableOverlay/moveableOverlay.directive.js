angular.module('moveableOverlay')
    .directive('moveableOverlay', ['moveableOverlayFactory','$document','mapOverlaysLayoutFactory',
        function(moveableOverlayFactory, $document, mapOverlaysLayoutFactory) {
            return {
                templateUrl: 'components/overlays/moveableOverlay/moveableOverlay.html',
                controller: 'moveableOverlayController',
                restrict: 'A',
                transclude: true,
                link: function($scope, element){
                    if (element.scope){
                        element = $(element);
                    }

                    $scope.closeOverlay = function(){
                        var activeOverlay = moveableOverlayFactory.getActiveOverlay();
                        if (activeOverlay.id === "DrawMenu"){
                            mapOverlaysLayoutFactory.setShowSearchOverlay(true);
                        }
                        moveableOverlayFactory.deactiveAllOverlay();
                        $scope.deactivateDrawFeatureTool($scope.GeoJSON);
                    };

                    var startX = 0;
                    var startY = 0;
                    var offSetX = 0;
                    var offSetY = 0;
                    var layerX = 0;
                    var layerY = 0;
                    var x = 0;
                    var y = 0;



                    element.on('mousedown touchstart', function(event) {
                        updateElementsPosition(element);
                        if (event.target.className !== 'col-xs-8' && event.target.className !== 'ng-scope' &&
                            event.target.className !== 'col-xs-4' && event.target.className !== 'header-icon icon-important fa fa-pencil'){
                            return event;
                        }
                        // Prevent default dragging of selected content
                        event.preventDefault();
                        // elementHeaderName = getElementHeaderName();

                        // if (!moveableOverlayFactory.hasElementHeaderName(elementHeaderName)){
                        //     elementHeaderName = "menu_feature_info_detail";
                        // }

                        var overlayPosition = moveableOverlayFactory.getActiveOverlay();
                        if (overlayPosition === undefined){
                            return event;
                        }
                        x = overlayPosition.left;
                        if (x === undefined || isNaN(x)){
                            x = 0;
                        }
                        y = overlayPosition.top;
                        if (y === undefined || isNaN(y)){
                            y = 0;
                        }

                        startX = getMouseEventX(event) - x;
                        startY = getMouseEventY(event) - y;
                        layerX = event.originalEvent.layerX;
                        layerY = event.originalEvent.layerY;

                        offSetX = (-1)*startX;
                        offSetY = (-1)*startY;

                        //updateElementsPosition(element);

                        $document.on('mousemove touchmove', mousemove);
                        $document.on('mouseup touchend', mouseup);
                    });

                    //element.on('mouseup touchend', function(){
                    //    updateElementsPosition(element);
                    //});

                    function updateElementsPosition(element){
                        var elements = document.getElementsByClassName("moveableOverlay");
                        for(var i = 0; i<elements.length; i++){
                            if (elements[i] !== element[0]){
                                elements[i].style.zIndex = 13;
                            }else{
                                elements[i].style.zIndex = 14;
                            }
                        }
                    }

                    function mousemove(event) {
                        var elementMapDiv = document.getElementById('mapDiv');
                        var elementMovableWidth = element.outerWidth();
                        var elementMovableHeight = element.outerHeight();

                        x = getMouseEventX(event) - startX;
                        y = getMouseEventY(event) - startY;

                        x = adjustX(x);
                        y = adjustY(y);

                        if (x<0){
                            x = 0;
                        }
                        if (y<0){
                            y=0;
                        }
                        if (x > (elementMapDiv.offsetWidth - elementMovableWidth)){
                            x = elementMapDiv.offsetWidth - elementMovableWidth;
                        }
                        if (y > (elementMapDiv.offsetHeight - elementMovableHeight)){
                            if (elementMapDiv.offsetHeight > elementMovableHeight){
                                y = elementMapDiv.offsetHeight - elementMovableHeight;
                            }else{

                                y = 0;
                            }
                        }
                        moveableOverlayFactory.setPositionForActiveOverlay(x, y);

                        element.css({
                            top: y + 'px',
                            left:  x + 'px'
                        });
                    }

                    // function getElementHeaderName(){
                    //     var spanElement = element[0].getElementsByTagName('span');
                    //     return spanElement[0].getAttribute('translate');
                    // }

                    function mouseup() {
                        $document.off('mousemove touchmove', mousemove);
                        $document.off('mouseup touchend', mouseup);
                    }

                    /* Utils */

                    // Ensure the x coordinate has a valid value
                    var adjustX = function(x) {
                        if (x < offSetX + layerX) {
                            if (navigator.appVersion.indexOf('Trident/') === 0) {
                                x = offSetX + layerX;
                            }
                        } else if (x -offSetX+(element.outerWidth() - layerX) > $(document.body).width()) {
                            if (navigator.appVersion.indexOf('Trident/') === 0) {
                                x = $(document.body).width() + offSetX - (element.outerWidth() - layerX);
                            }
                        }
                        return x;
                    };

                    // Ensure the y coordinate has a valid value
                    var adjustY = function(y) {
                        if (y < offSetY+layerY) {
                            if (navigator.appVersion.indexOf('Trident/') === 0) {
                                y = offSetY + layerY;
                            }
                        } else if (y + element.height() > ($(document.body).height())) {
                            if (navigator.appVersion.indexOf('Trident/') === 0) {
                                var newY = ($(document.body).height()) - element.height();
                                if (newY < 0) {
                                    var maxY = ($(document.body).height()) - element.outerHeight();
                                    if (y > maxY) {
                                        y = maxY;
                                    }
                                } else {
                                    y = newY;
                                }
                            }
                        }
                        return y;
                    };

                    // Get the X coordinate of a mouse or a touch event
                    var getMouseEventX = function(event) {
                        if (event.originalEvent) {
                            event = event.originalEvent;
                        }
                        return angular.isNumber(event.clientX) ? event.clientX :
                            event.touches[0].clientX;
                    };

                    // Get the Y coordinate of a mouse or touch event
                    var getMouseEventY = function(event) {
                        if (event.originalEvent) {
                            event = event.originalEvent;
                        }
                        return angular.isNumber(event.clientY) ? event.clientY :
                            event.touches[0].clientY;
                    };
                }
            };
        }]);