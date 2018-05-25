(function() {
    "use strict";

    /**
     * This function will be called to let you define new scenes that will be
     * shown after the splash screen.
     * In this example, create a simple scene with some circles on it.
     * @param director {CAAT.Director}
     */
    var createScenes = function(director) {
        var gs = new DR.GameScene(director);
    };


    /**
     * Startup it all up when the document is ready.
     */
    window.addEventListener(
        'load',
        function() {
            CAAT.modules.splash.ShowDefaultSplash(
                /* Set canvas size */
                DR.constants.sceneWidth, DR.constants.sceneHeight,

                /* keep splash at least this time */
                DR.constants.waitOnSplash,

                /* load these images and set them up for non splash scenes. */
                DR.resources.sceneImages,

                /* onEndSplash callback function. */
                createScenes
            );

            /*
             * Publish mousewheel events to canvas
             */
            var canvas = document.getElementsByTagName("canvas")[0],
                mouseWheelHandler = function (e) {
                    e = window.event || e; // old IE support
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    PubSub.publish("mouseWheelHandler", delta);
                    return false;
                };

            if (canvas.addEventListener) {
                canvas.addEventListener("mousewheel", mouseWheelHandler, false); // IE9, Chrome, Safari, Opera
                canvas.addEventListener("DOMMouseScroll", mouseWheelHandler, false); // Firefox
            }
            else {
                canvas.attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8
            }

        },
        false);

}());