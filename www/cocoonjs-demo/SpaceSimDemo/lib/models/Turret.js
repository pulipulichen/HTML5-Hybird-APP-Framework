(function() {
	"use strict";

	DR.models.Turret = function(parent, options) {
        this.initialize(parent, options);
		return this;
	};

    DR.models.Turret.id = 0;

	DR.models.Turret.prototype = {
        parent: null,

        id: 0,
        type: DR.constants.PROJECTILE_TYPES.GREEN,
        rate: 2,
        radius: 3000,
        x: 0,
        y: 0,
        waitUntilFire: 0,

        hull: null,
        rangeHull: null,

        initialize: function(parent, options) {
            this.parent = parent;

            this.id = DR.models.Turret.id++;

            _.extend(this, options);

            this.waitUntilFire = this.rate;

            this.addListener();
        },

        addListener: function() {
            var that = this;

            PubSub.subscribe('sceneTimerTick', function() {
                that.waitUntilFire -= 1;

                if (that.waitUntilFire <= 0) {
                    that.waitUntilFire = that.rate;
                    that.orderToFire();
                }

            });
        },

        orderToFire: function() {
            var target = this.seekTarget();

            if (!target) {
                return;
            }

            this.fire(new CAAT.Point(target.hull.x + Math.round(Math.random() * 300) -150, target.hull.y + Math.round(Math.random() * 300)-150));
        },

        seekTarget: function() {
            var parent = this.parent,
                parentHull = parent.hull,
                gameScene = parent.gameScene,
                gameContainer = gameScene.container,
                turretCircle = parentHull.modelToModel(new CAAT.Point(this.x, this.y), gameContainer),
                side = (parent.side === 'empire' ? 'rebel' : 'empire');

            turretCircle.radius = this.radius;
            return gameScene.checkShipCollision(turretCircle, side);
        },

		fire: function(targetCoordinates) {
			var turretCoordinates = this.parent.hull.modelToModel(new CAAT.Point(this.x, this.y), this.parent.gameScene.container);

			DR.ProjectileFactory.create(this.parent.gameScene, this.type, turretCoordinates, targetCoordinates);
        },

        showHull: function() {
            this.removeHulls();

            this.hull = new CAAT.ShapeActor()
                .setBounds(this.x, this.y, 24, 24)
                .setFillStyle('#FFF9DD')
                .enableEvents(false)
                .setPositionAnchor(0.5, 0.5)
                .setShape(0);

            this.rangeHull = new CAAT.ShapeActor()
                .setBounds(this.x, this.y, this.radius * 2, this.radius * 2)
                .setShape(0)
                .setFillStyle('#FFF9DD')
                .enableEvents(false)
                .setPositionAnchor(0.5, 0.5)
                .setAlpha(0.05);

            this.parent.hull.addChild(this.hull);
            this.parent.hull.addChild(this.rangeHull);
        },

        hideHull: function() {
            this.removeHulls();
        },

        removeHulls: function() {
            if (this.hull && this.hull.setDiscardable) {
                this.hull.remove();
            }

            if (this.rangeHull && this.rangeHull.setDiscardable) {
                this.rangeHull.remove();
            }

            this.hull = null;
            this.rangeHull = null;
        }

	};

}());