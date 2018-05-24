(function() {
	"use strict";

	/**
	 * Global constants for the application
	 * @type {Object}
	 */
	DR.constants = {

		/**
		 * Width px of scene
		 * @const
		 * @type {number}
		 */
		sceneWidth: 1024,
//		sceneWidth: 1280,
//		sceneWidth: 800,

		/**
		 * Height px of scene
		 * @const
		 * @type {number}
		 */
		sceneHeight: 768,
//		sceneHeight: 800,
//		sceneHeight: 480,

		/**
		 * Minimum seconds to wait in the splash screen
		 * @const
		 * @type {number}
		 */
		waitOnSplash: 4000,

		PROJECTILE_TYPES: {
            BLUE:   'laser_blue',
            GREEN:  'laser_green',
            RED:    'laser_red',
            YELLOW: 'laser_yellow'
        }

	};

}());