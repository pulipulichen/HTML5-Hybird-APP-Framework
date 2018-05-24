(function() {
    "use strict";

	/**
	 * Main singleton controller for the game
	 * @class
	 */
	DR.game = (function() {
		var defaultOptions = {
				director: null,
				serverAddress: 'localhost',
				marksAmountToReward: 5,
				players: []
			};

		return {
			gameLogic: null,
			options: {},

			/**
			 * Returns the game scene
			 * @return {CAAT.Scene}
			 */
			getGameScene: function() {
				return DR.sceneManager.get('gameScene');
			},

			/**
			 * Creates a game
			 * 1. Initialize a game client (or client-interface) and a server (or server-interface)
			 * 2. Initialize the game scene and/or the game logic
			 * @param {Object} additional_options Augment the default options
			 */
			create: function(additional_options) {
				this.options = _.extend(additional_options, defaultOptions);

				this.gameLogic = new DR.GameLogic().initialize(this.options);
				this.getGameScene().initialize();
			}
		};
	})();

})();