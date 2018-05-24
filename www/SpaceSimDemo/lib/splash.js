/**
 * @license
 * 
 * The MIT License
 * Copyright (c) 2010-2011 Ibon Tolosana, Hyperandroid || http://labs.hyperandroid.com/

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

CAAT.modules = CAAT.modules || {};

CAAT.modules.splash = CAAT.modules.splash || {};

CAAT.modules.splash.createSplashScene= function (director, showTime, sceneCreationCallback) {
    "use strict";

    var scene =			director.createScene(),
		TIME =			showTime,
		time =			new Date().getTime(),
		bg;

	bg = new CAAT.Actor().setBackgroundImage(director.getImage('splash'), true);

	bg.setLocation(
		director.width/2 - bg.width/2,
		director.height/2 - bg.height/2);

	scene.addChild(bg);

    scene.loadedImage = function(count, images) {

        if ( !images || count===images.length ) {

            var difftime= new Date().getTime()-time;
            if ( difftime<TIME ){
                difftime= Math.abs(TIME-difftime);
                if ( difftime>TIME ) {
                    difftime= TIME;
                }

                setTimeout(
                        function() {
                            CAAT.modules.splash.endSplash(director, images, sceneCreationCallback);
                        },
                        difftime );

            } else {
                CAAT.modules.splash.endSplash(director, images, sceneCreationCallback);
            }

        }
    };

    return scene;
};

CAAT.modules.splash.ShowDefaultSplash= function( width, height, minTime, imagesURL, onEndSplash )   {
    "use strict";

    var canvascontainer = document.createElement('canvas'),
        director;

	document.body.appendChild(canvascontainer);

	director = new CAAT.Director()
		.initialize(
				width || 1024,
				height || 768,
				canvascontainer);

    /**
     * Load splash images. It is supossed the splash has some images.
     */
    new CAAT.ImagePreloader().loadImages(
		DR.resources.splashImages,

		function on_load( counter, images ) {

            if ( counter === images.length ) {

                director.setImagesCache(images);
                var splashScene = CAAT.modules.splash.createSplashScene(director, minTime || DR.constants.waitOnSplash, onEndSplash);
                CAAT.loop(60);

                if ( imagesURL && imagesURL.length>0 ) {
                    /**
                     * Load resources for non splash screen
                     */
                    new CAAT.ImagePreloader().loadImages(imagesURL, splashScene.loadedImage);
                } else {
                    splashScene.loadedImage(0,null);
                }
            }
        }
    );

    DR.director = director;
};

/**
 * Finish splash process by either timeout or resources allocation end.
 * @param director {CAAT.Director}
 * @param images {Array<Object>}
 * @param onEndSplashCallback
 */
CAAT.modules.splash.endSplash= function(director, images, onEndSplashCallback) {
    "use strict";

    director.emptyScenes();
    director.setImagesCache(images);
    director.setClear( true );

    onEndSplashCallback(director);

    director.easeIn(
            0,
            CAAT.Scene.prototype.EASE_SCALE,
            800,
            false,
            CAAT.Actor.prototype.ANCHOR_CENTER,
            new CAAT.Interpolator().createExponentialInInterpolator(-0.5, false) );

};
