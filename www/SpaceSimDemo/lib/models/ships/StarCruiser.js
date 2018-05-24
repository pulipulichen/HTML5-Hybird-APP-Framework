(function() {
	"use strict";

	DR.models.ships.StarCruiser = function(gameScene, options) {
        this.initialize(gameScene, options);
		return this;
	};

    DR.models.ships.StarCruiser.prototype = new DR.models.Ship();

	_.extend(DR.models.ships.StarCruiser.prototype, {

        hullResourceId: 'calamari2',
        speed: 40,

        labelX: 130,
        labelY: -20,

		initializeTurrets: function() {
			this.turrets = [
				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 390,
                    y: 70,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.GREEN,
                    x: 390,
                    y: 102,
                    rate: 2,
                    radius: 900
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 270,
                    y: 40,
                    rate: 1,
                    radius: 600
                }),

				new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.BLUE,
                    x: 270,
                    y: 132,
                    rate: 1,
                    radius: 600
                }),

                new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 150,
                    y: 5,
                    rate: 1,
                    radius: 400
                }),

                new DR.models.Turret(this, {
                    type: DR.constants.PROJECTILE_TYPES.RED,
                    x: 150,
                    y: 167,
                    rate: 1,
                    radius: 400
                })
            ];
        },

        initializeHitbox: function() {
            this.hitbox = [
                { x: 100, y: 86, radius: 30 },
                { x: 210, y: 86, radius: 70 },
                { x: 330, y: 86, radius: 30 }
            ];
        }

    });

}());