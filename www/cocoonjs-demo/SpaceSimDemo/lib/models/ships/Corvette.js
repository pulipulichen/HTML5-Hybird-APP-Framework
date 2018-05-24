(function() {
	"use strict";

	DR.models.ships.Corvette = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.Corvette.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.Corvette.prototype, {

        hullResourceId: 'corvette',
        speed: 70,

        labelX: 30,
        labelY: -25,

        initializeTurrets: function() {
            this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 20,
                    y: 25,
                    rate: 2,
                    radius: 700
                }),

                new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 80,
                    y: 25,
                    rate: 1,
                    radius: 500
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 30, y: 25, radius: 28 },
                { x: 75, y: 25, radius: 20 }
            ];
        }

    });

}());