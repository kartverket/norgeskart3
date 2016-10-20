angular
    .module('moveableOverlay')
    .factory('moveableOverlayFactory', function(){
        var moveableOverlayList = [
            {
                id: "DrawMenu",
                headingTitle: 'draw_menu',
                headingIcon: 'fa fa-pencil',
                show: false,
                top: 12,
                left: 455
            }
        ];

        var defaultPosition = {
            top: 12,
            left: 455
        };

        return {

            setActiveOverlay: function(overlayId){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    moveableOverlayList[i].show = moveableOverlayList[i].id === overlayId;
                }
            },

            deactiveAllOverlay: function(){
                for (var i = 0; i < moveableOverlayList.length; i++){
                    moveableOverlayList[i].show = false;
                    moveableOverlayList[i].top = defaultPosition.top;
                    moveableOverlayList[i].left = defaultPosition.left;
                }
            },

            setPositionForActiveOverlay: function (letft, top) {
                for (var i = 0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].show){
                        moveableOverlayList[i].left = letft;
                        moveableOverlayList[i].top = top;

                    }
                }
            },

            getActiveOverlay: function () {
                for (var i = 0; i < moveableOverlayList.length; i++){
                    if (moveableOverlayList[i].show){
                        return moveableOverlayList[i];
                    }
                }
                return undefined;
            },

            isOverlayVisible: function () {
                var activeOverlay = this.getActiveOverlay();
                if (activeOverlay !== undefined){
                    return activeOverlay.show;
                }else{
                    return false;
                }
            }
        };
    });