(function() {
    "use strict";

    DR.models.Ship = function() {
        return this;
    };

    DR.models.Ship.shipLabels = null;
    DR.models.Ship.labelIndexes = {
        'Devastator': 0,
        'Whirlwind': 1,
        'Direption': 2,
        'Companion': 3,
        'Dependence': 4,
        'Vanguard': 5
    };

    DR.models.Ship.prototype = {
        gameScene: null,

        id: '',

        /**
         * A ship belongs to 'rebel' or 'empire'
         */
        side: 'empire',

        hullResourceId: '',
        hull: null,

        clicked: false,

        width: 0,
        height: 0,

        /*
         * Speed is in pixels/seconds
         */
        speed: 50,

        target: null,
        targetHull: null,
        pathToTargetHull: null,
        moveBehavior: null,

        label: null,
        labelX: 0,
        labelY: 0,

        turrets: [],
        hitbox: [],
        hitboxHulls: [],

        initialize: function(gameScene, options) {
            var that = this;

//            if (!DR.models.Ship.shipLabels) {
//                DR.models.Ship.shipLabels = new CAAT.SpriteImage().initialize(DR.director.getImage('shiplabels'), 16, 1);
//            }

            options = _.extend({
                id: '',
                side: 'empire',
                x: 0,
                y: 0,
                rotation: 0
            }, options);

            this.gameScene = gameScene;
            this.id = options.id;
            this.side = options.side;

            this.hull = new CAAT.ActorContainer()
                .setBackgroundImage(this.gameScene.director.getImage(this.hullResourceId), true)
                .enableEvents(true);

            this.hull.setPositionAnchor(0.5, 0.5);

            this.width = this.hull.width;
            this.height = this.hull.height;

            this.setLocation(options.x, options.y);
            this.setRotation(options.rotation);

            this.initializeTurrets();
            this.initializeHitbox();
            this.initializeClick();

            // Delegate mousemove up to container to allow scene move
			// REMOVED BECAUSE OF SOME BUGS ON FOCUS AND DRAG WHILE SHIP IS MOVING
			// this.hull.mouseDown = function(e) { that.gameScene.container.mouseDown(e); };
			// this.hull.mouseUp   = function(e) { that.gameScene.container.mouseUp(e); };
			// this.hull.mouseDrag = function(e) { that.gameScene.container.mouseDrag(e); };

            this.gameScene.container.addChild(this.hull);
        },

        initializeTurrets: function() {},
        initializeHitbox: function() {},

        setLocation: function(x, y) {
            this.hull.setLocation(x - (this.width / 2), y - (this.height / 2));
        },

        setRotation: function(deg) {
            this.hull.setRotation(CAAT.degreesToRadians(deg));
        },

        getLocation: function() {
            return {
                x: this.hull.x,
                y: this.hull.y
            };
        },

        moveTo: function(x, y) {
            this.createTarget(x, y, false);
        },


        initializeClick: function() {
            var that = this;

            this.hull.mouseDown = function() {
                that.showTurrets();
//                that.showHitbox();

                if (that.clicked) {
                    that.uninitializeClick();
                } else {
                    that.clicked = PubSub.subscribe('containerClick', function(e, event) {
                        that.createTarget(event.x, event.y, true);
                        that.uninitializeClick();
                    });
                }

            };
        },

        /**
         * Remove click state from ship, eg. remove the hull of turrets
         */
        uninitializeClick: function() {
            this.hideTurrets();
//            this.hideHitbox();

            if (this.clicked) {
                _.defer(PubSub.unsubscribe, this.clicked);
                this.clicked = false;
            }
        },

        showTurrets: function() {
            _.each(this.turrets, function(turret) {
                if (!turret.hull) {
                    turret.showHull();
                }
            });
        },

        hideTurrets: function() {
            _.each(this.turrets, function(turret) {
                if (turret.hull) {
                    turret.hideHull();
                }
            });
        },

        showHitbox: function() {
            var that = this;

            _.each(this.hitbox, function(hitbox) {
                var hitboxHull = new CAAT.ShapeActor()
                    .setBounds(hitbox.x, hitbox.y, hitbox.radius * 2, hitbox.radius * 2)
                    .setShape(0)
                    .setFillStyle('#FFF9DD')
                    .enableEvents(false)
                    .setPositionAnchor(0.5, 0.5)
                    .setAlpha(0.5);

                that.hull.addChild(hitboxHull);
                that.hitboxHulls.push(hitboxHull);
            });
        },

        hideHitbox: function() {
            _.each(this.hitboxHulls, function(hitboxHull) {
                hitboxHull.remove();
            });

            this.hitboxHulls = [];
        },

        createTarget: function(x, y, display) {
            this.clearTarget();

			x = Math.round(x);
			y = Math.round(y);

            this.target = { x: x, y: y };

            if (display) {
                this.createTargetHull();
            }

            this.createMovePath(display);
        },

        createTargetHull: function() {
            if (!this.target) {
                return;
            }

            var scale = (this.gameScene.containerZoom !== 1) ? 2 - this.gameScene.containerZoom : 1;

            this.targetHull = new CAAT.Actor()
                .setBounds(this.target.x - 28, this.target.y - 28, 55, 55)
                .setBackgroundImage(this.gameScene.director.getImage('target'), true)
                .setScale(scale, scale)
                .enableEvents(false)
                .addBehavior(
                    new CAAT.RotateBehavior()
                        .setFrameTime(this.gameScene.scene.time, 400)
                        .setValues(Math.PI, 0)
                )
                .addBehavior(
                    new CAAT.ScaleBehavior()
                        .setInterpolator(new CAAT.Interpolator().createElasticOutInterpolator(2.9, 1, false))
                        .setFrameTime(this.gameScene.scene.time, 500)
                        .setValues(scale - 0.8, scale, scale - 0.8, scale)
                )
                .addBehavior(
                    new CAAT.AlphaBehavior()
                        .setFrameTime(this.gameScene.scene.time + 1000, 500)
                        .setValues(1, 0)
                );

            this.gameScene.container.addChild(this.targetHull);
        },

        createMovePath: function(display) {
            var location = this.getLocation(),
                quadraticShiftPoint,
                path = new CAAT.Path(),
				distanceBetweenLocationAndTarget = Math.sqrt(Math.pow(this.target.x - location.x, 2) + Math.pow(this.target.y - location.y, 2));

//			console.log(distanceBetweenLocationAndTarget);

			if (distanceBetweenLocationAndTarget > (this.hull.width * 2)) {
				quadraticShiftPoint = this.hull.modelToModel(new CAAT.Point(this.hull.width * 2, this.hull.height / 2), this.gameScene.container);
			} else {
				quadraticShiftPoint = this.hull.modelToModel(new CAAT.Point(this.hull.width * 2, this.hull.height / 2), this.gameScene.container);
			}

			path.beginPath(location.x, location.y)
				.addQuadricTo(quadraticShiftPoint.x, quadraticShiftPoint.y, this.target.x, this.target.y, 'white')
				.endPath();

            if (display) {
                this.pathToTargetHull = new CAAT.PathActor()
                    .setBounds(0, 0, this.target.x, this.target.y)
                    .enableEvents(false)
                    .setInteractive(false)
                    .setPath(path)
                    .addBehavior(
                        new CAAT.AlphaBehavior()
                            .setFrameTime(this.gameScene.scene.time + 1000, 500)
                            .setValues(1, 0)
                    );

                this.gameScene.container.addChild(this.pathToTargetHull);
            }

            this.moveBehavior = new CAAT.PathBehavior()
                        .setPath(path)
                        .setInterpolator(new CAAT.Interpolator().createExponentialOutInterpolator(2))
                        .setFrameTime(this.gameScene.scene.time, path.getLength() / this.speed * 1000)
                        .setCycle(false)
                        .setAutoRotate(true);

            this.hull.addBehavior( this.moveBehavior );
        },

        clearTarget: function() {
            if (!this.target) {
                return;
            }

            if (this.moveBehavior) {
                this.hull.removeBehaviour(this.moveBehavior);
                this.moveBehavior = null;
            }

            this.target = null;

			if (this.targetHull) {
				this.targetHull.remove();
				this.targetHull = null;
			}

			if (this.pathToTargetHull) {
				this.pathToTargetHull.remove();
				this.pathToTargetHull = null;
			}
        }

//        showLabel: function() {
//            console.log(this.id);
//            console.log([DR.models.Ship.labelIndexes[this.id]]);
//
//            var actor = new CAAT.Actor()
//                    .enableEvents(false)
//                    .setBackgroundImage(DR.models.Ship.shipLabels, false)
//                    .setAnimationImageIndex([DR.models.Ship.labelIndexes[this.id]])
//                    .setSize(255, 45)
//                    .setPositionAnchor(0.5, 0.5)
//                    .setLocation(this.labelX, this.labelY);
//
//            this.hull.addChild(actor);
//        },


    };

}());