(function() {
	"use strict";

	DR.models.ships.Interdictor = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.Interdictor.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.Interdictor.prototype, {

        hullResourceId: 'interdictor',
        speed: 45,

		initializeTurrets: function() {
			this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 360,
                    y: 90,
                    rate: 2,
                    radius: 800
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 360,
                    y: 140,
                    rate: 2,
                    radius: 800
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 200,
                    y: 50,
                    rate: 1,
                    radius: 400
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 200,
                    y: 180,
                    rate: 1,
                    radius: 400
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 93, y: 115, radius: 90 },
                { x: 240, y: 115, radius: 55 },
                { x: 330, y: 115, radius: 35 }
            ];
        }

    });

}());