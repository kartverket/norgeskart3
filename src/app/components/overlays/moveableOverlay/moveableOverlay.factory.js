angular
    .module('moveableOverlay')
    .factory('moveableOverlayFactory', function(){
        var moveableOverlayList = [
            {
                id: "DrawMenu",
                headingTitle: 'draw_menu',
                show: false,
                top: 100,
                left: 265
            }
        ];

        return {
            getOverlayById: function(overlayId){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].id === overlayId){
                        return moveableOverlayList[i];
                    }
                }
                return undefined;
            },

            setActiveOverlay: function(overlayId){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].id === overlayId){
                        moveableOverlayList[i].show = true;
                    }
                }
            },

            deactiveAllOverlay: function(){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    moveableOverlayList[i].show = false;
                }
            },

            deactiveOverlay: function(overlayId){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].id === overlayId){
                        moveableOverlayList[i].show = false;
                    }
                }
            },

            hasElementHeaderName: function(headerName){
                for (var i = 0; i< moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].headingTitle === headerName){
                        return true;
                    }
                }
                return false;
            },

            getOverlayByHeaderName: function(headerName){
                for (var i=0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].headingTitle === headerName){
                        return moveableOverlayList[i];
                    }
                }
            },

            setPositionForOverlayByHeaderName: function(headerName, left, top){
                for (var i=0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].headingTitle == headerName){
                        moveableOverlayList[i].left = left;
                        moveableOverlayList[i].top = top;
                        break;
                    }
                }
            }
        };
    });