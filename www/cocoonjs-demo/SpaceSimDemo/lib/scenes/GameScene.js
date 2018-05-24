(function() {
	"use strict";

	DR.GameScene = function(director) {
        this.initialize(director);
		return this;
	};

	DR.GameScene.prototype = {
		director: null,

		backgroundResourceId: 'background',
		background: null,

		scene: null,

		container: null,
        containerZoom: 0.6,

		width: null,
		height: null,

        ships: {
            empire: [],
            rebel: []
        },

		initialize: function(director) {
            var that = this;

			this.director = director;
			this.scene = director.createScene();

			this.scene
				.setFillStyle('#000000')
				.setBounds(0, 0, director.width, director.height)
                .createTimer(
                    0,
                    200,
                    function(scene_time, timer_time, timertask_instance)  {
                        timertask_instance.reset(scene_time);
                        PubSub.publish('sceneTimerTick');
                    }
               );

            this.background = new CAAT.Actor()
                .setBackgroundImage(director.getImage(this.backgroundResourceId), true)
                .enableEvents(false);

            this.scene.addChild(this.background);

			this.width = this.background.width;
			this.height = this.background.height;

			this.width = 1024;
			this.height = 768;

			this.createContainer();
			this.createMenu();

			return this;
		},

        createContainer: function() {
			this.container = new CAAT.ActorContainer()
				.setBounds(1400, 400, this.width * 5, this.height * 5)
                .setPositionAnchor(0.5, 0.5)
                .setScale(this.containerZoom, this.containerZoom);

			this.initContainerMove();
            this.initContainerZoom();

			this.scene.addChild(this.container);
        },

		initContainerMove: function() {
			this.container.mouseDown = function(mouseEvent) {
				this.__d_ax = -1;
				this.__d_ay = -1;
			};

			this.container.mouseUp = function(mouseEvent) {
				this.__d_ax = -1;
				this.__d_ay = -1;
			};

			this.container.mouseDrag = function(mouseEvent) {
				var pt = this.modelToView( new CAAT.Point(mouseEvent.x, mouseEvent.y ));

				this.parent.viewToModel( pt );

				if (this.__d_ax === -1 || this.__d_ay === -1) {
					this.__d_ax = pt.x;
					this.__d_ay = pt.y;
				}

                this.x = this.x + pt.x-this.__d_ax;
                this.__d_ax= pt.x;
                this.y = this.y + pt.y-this.__d_ay;
                this.__d_ay= pt.y;
			};

			this.container.mouseClick = function(mouseEvent) {
				PubSub.publish('containerClick', mouseEvent);
			};
		},

        zoomIn: function() {
            this.zoomBy(0.1);

        },

        zoomOut: function() {
            this.zoomBy(-0.1);
        },

        zoomBy: function(value) {
            this.containerZoom += value;
            if (this.containerZoom > 1) {
                this.containerZoom = 1;
            } else if (this.containerZoom < 0.3) {
                this.containerZoom = 0.3;
            }

            // Normalize JavaScript floating point operations, because of 1.1 + 0.1 = 1.2000000000000002
            this.containerZoom = Math.round(this.containerZoom * 10) / 10;

            this.container.scaleTo(this.containerZoom, this.containerZoom, 200, 0);
        },

        initContainerZoom: function() {
            var that = this;

            PubSub.subscribe('mouseWheelHandler', function(e, delta) {
                if (delta > 0) {
                    that.zoomIn();
                } else {
                    that.zoomOut();
                }
            });
        },

		createMenu: function() {
			var that = this,
				director = this.director,
				menu = new CAAT.ActorContainer()
					.setBackgroundImage(director.getImage('menu'), true)
					.setGlobalAlpha(true)
					.setAlpha(0)
					.enableEvents(true)
					.addBehavior(
						new CAAT.AlphaBehavior()
							.setValues(0, 1)
							.setFrameTime(this.scene.time + 300, 0)
					),
				button = new CAAT.Actor()
					.setBackgroundImage(new CAAT.SpriteImage().initialize(DR.director.getImage('button'), 2, 1), true)
					.setSpriteIndex(0)
					.setLocation(230, 145)
					.enableEvents(true);

			menu.distortionAnim(this.scene.time + 300, 4);
			menu.setLocation(director.width / 2 - menu.width / 2, director.height / 2 - menu.height / 2);

			button.mouseEnter = function() {
				button.setSpriteIndex(1);
				CAAT.setCursor('pointer');
			};

			button.mouseExit = function() {
				button.setSpriteIndex(0);
				CAAT.setCursor('default');
			};

			button.mouseClick = function() {
				menu.distortionAnim(that.scene.time, 4);
				menu.addBehavior(new CAAT.AlphaBehavior()
						.setValues(1, 0)
						.setFrameTime(that.scene.time + 300, 0)
						.addListener({
							behaviorExpired: function() {
								CAAT.setCursor('default');
								menu.setDiscardable(true);
								menu.setExpired(true);
							}
						})
					);

				that.createBounds();
				that.createShips();
			};

			menu.addChild(button);
			this.scene.addChild(menu);
		},

        createBounds: function() {
            this.container.addChild(
                new CAAT.Actor()
                    .setBounds(-5000, -5000, 5000, 10000)
                    .setAlpha(0.5)
                    .setFillStyle('#673147'));

            this.container.addChild(
                new CAAT.Actor()
                    .setBounds(0, -5000, this.container.width, 5000)
                    .setAlpha(0.5)
                    .setFillStyle('#673147'));

            this.container.addChild(
                new CAAT.Actor()
                    .setBounds(this.container.width, -5000, 5000, 10000)
                    .setAlpha(0.5)
                    .setFillStyle('#673147'));

            this.container.addChild(
                new CAAT.Actor()
                    .setBounds(0, this.container.height, this.container.width, 5000)
                    .setAlpha(0.5)
                    .setFillStyle('#673147'));
        },

        createShips: function() {
			var i, ship, speed;

			// ADD IMPERIAL SHIPS
            this.ships.empire.push(new DR.models.ships.Interdictor(this, {
                id: 'Whirlwind',
                side: 'empire',
                x: 0,
                y: 2000,
                rotation: 0
            }));

            this.ships.empire.push(new DR.models.ships.Stardestroyer(this, {
                id: 'Devastator',
                side: 'empire',
                x: -100,
                y: 2500,
                rotation: 0
            }));

            this.ships.empire.push(new DR.models.ships.Victory(this, {
                id: 'Direption',
                side: 'empire',
                x: -250,
                y: 1600,
                rotation: 0
            }));

			for (i=0; i<3; i++) {
				ship = this.ships.empire[i];
				speed = ship.speed;
				ship.speed = 600;
				ship.moveTo(ship.hull.x + 1300, ship.hull.y);
				ship.speed = speed;
			}


			// ADD REBEL SHIPS
            this.ships.rebel.push(new DR.models.ships.Corvette(this, {
                id: 'Companion',
                side: 'rebel',
                x: 4300,
                y: 1600,
                rotation: 180
            }));

            this.ships.rebel.push(new DR.models.ships.HomeOne(this, {
                id: 'Dependence',
                side: 'rebel',
                x: 4100,
                y: 2500,
                rotation: 180
            }));

            this.ships.rebel.push(new DR.models.ships.StarCruiser(this, {
                id: 'Vanguard',
                side: 'rebel',
                x: 4000,
                y: 2000,
                rotation: 180
            }));
        },

        checkShipCollision: function(checkPosition, side) {
            var targets = side ? this.ships[side] : this.ships.empire.concat(this.ships.rebel),
                ship, i, j, hitbox, hitboxCircle;

            for (i=0; ship = targets[i]; i++)
            {
                for (j=0; hitbox = ship.hitbox[j]; j++) {
                    hitboxCircle = ship.hull.modelToModel(new CAAT.Point(hitbox.x, hitbox.y), this.container);
                    hitboxCircle.radius = hitbox.radius;

                    if (CAAT.testCircleCircleIntersection(checkPosition, hitboxCircle)) {
                        return ship;
                    }
                }
            }

            return false;
        }
	};

}());