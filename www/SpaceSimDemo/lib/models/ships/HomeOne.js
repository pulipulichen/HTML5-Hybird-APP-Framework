(function() {
	"use strict";

	DR.models.ships.HomeOne = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.HomeOne.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.HomeOne.prototype, {

        hullResourceId: 'calamari1',
        speed: 55,

        labelX: 130,
        labelY: -15,

		initializeTurrets: function() {
			this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 420,
                    y: 35,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 420,
                    y: 77,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 300,
                    y: 10,
                    rate: 1,
                    radius: 600
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.YELLOW,
                    x: 300,
                    y: 97,
                    rate: 1,
                    radius: 600
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 180,
                    y: 20,
                    rate: 1,
                    radius: 400
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 180,
                    y: 93,
                    rate: 1,
                    radius: 400
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 130, y: 56, radius: 40 },
                { x: 240, y: 56, radius: 50 },
                { x: 350, y: 56, radius: 40 }
            ];
        }

    });

}());