(function() {
	"use strict";

	DR.ProjectileFactory = (function() {
		var FACTORY_TYPE = 'default', // 'default' or 'pool'
			pools = {},
			pool = new DR.ProjectilePool('laser_yellow');

		if (DR.ProjectilePool) {
			_.forEach(DR.constants.PROJECTILE_TYPES, function(v, k) {
				pools[v] = new DR.ProjectilePool(v);
			});
		}

		return {
			create: function(gameScene, type, fromCoordinates, toCoordinates) {
				if (FACTORY_TYPE === 'pool') {
					return pools[type].borrowObject(gameScene, fromCoordinates, toCoordinates);
				} else {
					return new DR.models.Projectile(gameScene, type, fromCoordinates, toCoordinates);
				}
			},

			destroy: function(projectile) {
				if (FACTORY_TYPE === 'pool') {
					pools[projectile.type].returnObject(projectile);
				} else {
                    projectile.hull.remove();
				}
			}
		};
	}());

}());