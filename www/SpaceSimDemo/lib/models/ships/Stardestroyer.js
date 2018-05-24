(function() {
	"use strict";

	DR.models.ships.Stardestroyer = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.Stardestroyer.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.Stardestroyer.prototype, {

        hullResourceId: 'stardestroyer',
        speed: 40,

		initializeTurrets: function() {
			this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 400,
                    y: 125,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 400,
                    y: 210,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 250,
                    y: 70,
                    rate: 1,
                    radius: 600
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 250,
                    y: 265,
                    rate: 1,
                    radius: 600
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 100,
                    y: 15,
                    rate: 1,
                    radius: 400
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 100,
                    y: 320,
                    rate: 1,
                    radius: 400
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 145, y: 170, radius: 130 },
                { x: 345, y: 170, radius: 60 }
            ];
        }

    });

}());