(function() {
	"use strict";

	DR.ProjectilePool = function(type) {
		this.initialize(type);
		return this;
	};

	DR.ProjectilePool.prototype = {
		type: null,
		pool: [],

		initialize: function(type) {
			this.type = type;
			this.pool = [];
		},

		borrowObject: function(gameScene, fromCoordinates, toCoordinates) {
			if (!this.pool.length) {
				return new DR.models.Projectile(gameScene, this.type, fromCoordinates, toCoordinates);
			}

			return (this.pool.shift()).launch(fromCoordinates, toCoordinates);
		},

		returnObject: function(projectile) {
			projectile.gameScene.container.removeChild(projectile.hull);
			this.pool.push(projectile);
		}



	};

}());