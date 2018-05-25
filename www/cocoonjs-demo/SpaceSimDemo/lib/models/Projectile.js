(function() {
	"use strict";

    var explosionIndexes = [], i;
    for (i=0; i<=63; i++) {
        explosionIndexes.push(i);
    }

	DR.models.Projectile = function(gameScene, type, fromCoordinates, toCoordinates) {
		this.initialize(gameScene, type, fromCoordinates, toCoordinates);
		return this;
	};

	DR.models.Projectile.prototype = {
		initialized: false,
		gameScene: null,
		hull: null,

		type: null,

		moveX: null,
		moveY: null,

		interpolator: null,

		initialize: function(gameScene, type, fromCoordinates, toCoordinates) {
			var that = this;

			if (!this.initialized) {
				this.gameScene = gameScene;
				this.type = type;
				this.interpolator = (new CAAT.Interpolator()).createLinearInterpolator();

				that.createHull();
				that.createMoves();

				this.initialized = true;
			}

			this.launch(fromCoordinates, toCoordinates);
		},

		createHull: function() {
			this.hull = new CAAT.Actor()
				.setBackgroundImage(this.gameScene.director.getImage(this.type), true)
//				.setSize(11, 48)
				.enableEvents(false);

//			var p = this.hull.paint;
//
//			this.hull.paint= function(director, time) {
//
//				var ctx= director.ctx;
//				var gap= 80;
//
//				ctx.strokeStyle = 'rgb(255,255,255)';
//				ctx.beginPath();
//				ctx.moveTo(5, 0);
//				ctx.lineTo(5, 48);
//
//				ctx.shadowColor = "rgb(255,255,255)";
//				ctx.shadowBlur = 6;
//				ctx.lineWidth=2;
//				ctx.lineJoin='round';
//				ctx.lineCap='round';
//
//				ctx.stroke();
//			};
//
//			this.hull.cacheAsBitmap();
//			this.hull.paint = p;

		},

		createMoves: function() {
			var that = this,
                hull = that.hull,
                gameScene = that.gameScene,
                enemy;

			this.moveX = new CAAT.GenericBehavior();
			this.moveY = new CAAT.GenericBehavior();

			hull.addBehavior(this.moveX);
			hull.addBehavior(this.moveY);

			this.moveX.addListener({
				behaviorExpired : function(behavior, time, actor) {
                    var position = hull.modelToModel(new CAAT.Point(hull.width / 2, hull.height / 2), gameScene.container);

                    if (enemy = gameScene.checkShipCollision(position)) {
                        that.createExplosion(position, enemy);
                    }

					DR.ProjectileFactory.destroy(that);
				}
			});
		},

		launch: function(fromCoordinates, toCoordinates) {
			this.gameScene.container.addChild(this.hull);

			this.hull
				.setRotation(Math.atan2(toCoordinates.x - fromCoordinates.x, fromCoordinates.y - toCoordinates.y))
                .setPositionAnchor(0.5, 0.5)
				.setLocation(fromCoordinates.x, fromCoordinates.y);

			this.moveX
				.setFrameTime(this.gameScene.scene.time, 1000)
				.setInterpolator(this.interpolator)
				.setValues(fromCoordinates.x, toCoordinates.x, this.hull, 'x');

			this.moveY
				.setFrameTime(this.gameScene.scene.time, 1000)
				.setInterpolator(this.interpolator)
				.setValues(fromCoordinates.y, toCoordinates.y, this.hull, 'y');
		},

        createExplosion: function(position, enemy) {
            var gameScene = this.gameScene,
                positionInShip = gameScene.container.modelToModel(position, enemy.hull),
                explosionIndex = Math.round(Math.random() * 5) + 1,
                explosion = new CAAT.Actor()
                    .enableEvents(false)
                    .setBackgroundImage(
                        new CAAT.SpriteImage().initialize(gameScene.director.getImage('explosion' + explosionIndex), 8, 8), true)
                    .setAnimationImageIndex( explosionIndexes )
                    .setChangeFPS(20)
                    .setPositionAnchor(0.5, 0.5)
                    .setRotation(Math.random() * 7)
                    .setLocation(positionInShip.x, positionInShip.y)
                    .addBehavior(
                        new CAAT.GenericBehavior()
                            .setFrameTime(gameScene.scene.time, 1280)
                            .addListener({
                                behaviorExpired : function(behavior, time, actor) {
                                    explosion.remove();
                                }
                            })
                    );

            enemy.hull.addChild(explosion);
        }

	};

}());