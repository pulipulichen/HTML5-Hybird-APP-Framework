(function() {
	"use strict";

	DR.resources = {

		/**
		 * Images to preload on splash screen
		 */
		sceneImages: [
			{ id: 'background', url: 'res/background'+DR.constants.sceneWidth+'.jpg' },
			{ id: 'bound', url: 'res/bound.png' },
			{ id: 'menu', url: 'res/menu.png' },
			{ id: 'button', url: 'res/button.png' },
			{ id: 'laser_blue', url: 'res/laser_blue.png' },
			{ id: 'laser_green', url: 'res/laser_green.png' },
			{ id: 'laser_red', url: 'res/laser_red.png' },
			{ id: 'laser_yellow', url: 'res/laser_yellow.png' },
			{ id: 'explosion1', url: 'res/explosion1.png' },
			{ id: 'explosion2', url: 'res/explosion2.png' },
			{ id: 'explosion3', url: 'res/explosion3.png' },
			{ id: 'explosion4', url: 'res/explosion4.png' },
			{ id: 'explosion5', url: 'res/explosion5.png' },
			{ id: 'explosion6', url: 'res/explosion6.png' },
			{ id: 'target', url: 'res/target.png' },
            { id: 'awing', url: 'res/ship_awing.png' },
            { id: 'xwing', url: 'res/ship_xwing.png' },
            { id: 'corvette', url: 'res/ship_cr90_corvette.png' },
            { id: 'calamari1', url: 'res/ship_home_one.png' },
            { id: 'calamari2', url: 'res/ship_mc80_star_cruiser.png' },
            { id: 'interdictor', url: 'res/ship_sd_interdictor.png' },
            { id: 'stardestroyer', url: 'res/ship_star_destroyer.png' },
            { id: 'interceptor', url: 'res/ship_tie_interceptor.png' },
            { id: 'fighter', url: 'res/ship_tief.png' },
            { id: 'victory', url: 'res/ship_victory.png' },
            { id: 'shiplabels', url: 'res/shiplabels.png' }
		],

		/**
		 * Images to preload before splash screen
		 */
		splashImages: [
			{ id: 'splash', url: 'res/splash'+DR.constants.sceneWidth+'.jpg'}
		]

	};

}());