(function() {
	"use strict";

	DR.models.ships.Victory = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.Victory.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.Victory.prototype, {

        hullResourceId: 'victory',
        speed: 55,

        initializeTurrets: function() {
            this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 220,
                    y: 60,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 220,
                    y: 120,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 80,
                    y: 15,
                    rate: 1,
                    radius: 500
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 80,
                    y: 165,
                    rate: 1,
                    radius: 500
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 85, y: 90, radius: 70 },
                { x: 195, y: 90, radius: 40 }
            ];
        }

    });

}());