(function() {
    "use strict";

	CAAT.Actor.prototype.distortionAnim = function(timeToStartActor, numberOfDistortions) {
		numberOfDistortions = numberOfDistortions || 6;

		for (var i=0, actX = 0, actY = 0, newX, newY; i<numberOfDistortions; i++) {
			newX = Math.random()*2 - 0.3;
			newY = Math.random()*2 - 0.3;

			this.addBehavior(new CAAT.ScaleBehavior()
					.setFrameTime( timeToStartActor + i*40, 20 + Math.round(Math.random()*40) )
					.setValues( actX, newX, actY, newY ));

			actX = newX;
			actY = newY;
		}

		this.addBehavior(new CAAT.ScaleBehavior()
				.setFrameTime( timeToStartActor + (i+1)*50, 50 )
				.setValues( actX, 1, actY, 1 ));

		return timeToStartActor + (i+2)*50;
	};

	CAAT.Actor.prototype.setAsTextButton = function(normalTextFillStyle, overTextFillStyle, pressTextFillStyle, onClick) {
		this.calcTextSize(f);

		this.setSize(this.textWidth , this.textHeight);

		this.mouseEnter = function(e) {
			this.setTextFillStyle(overTextFillStyle);
			//this.distortionAnim(this.time, 1);
			CAAT.setCursor('pointer');
		};

		this.mouseExit = function(e) {
			this.setTextFillStyle(normalTextFillStyle);
			CAAT.setCursor('default');
		};

		this.mouseDown = function(e) {
			this.setTextFillStyle(pressTextFillStyle);
		};

		this.mouseClick = onClick;

		return this;
	};

	CAAT.Actor.prototype.setMouseClick = function(fn) {
        this.mouseClick = fn;
        return this;
    };

	CAAT.ActorContainer.prototype.createMenuItem = function(director, text, width, fontSize) {
		width = width || this.width;
		fontSize = fontSize || DR.constants.menuTextSize;

		var menuItem = new CAAT.ActorContainer()
					.enableEvents(true)
					.setGlobalAlpha(true),

			textItem = new CAAT.TextActor()
					.setText(text)
					.setPosition(0, 0)
					.setFont(fontSize+"px "+ DR.constants.menuFontFamily)
					.calcTextSize(director)
					.setTextAlign("left")
					.setTextBaseline('top')
					.enableEvents(false)
					.setTextFillStyle(DR.constants.menuTextColor);

		textItem.setSize(textItem.textWidth, fontSize);
		menuItem.setSize(width, fontSize);

		menuItem.mouseEnter = function(e) {
			textItem.setTextFillStyle(DR.constants.menuTextOverColor);
			//textItem.distortionAnim(this.time, 3);
			CAAT.setCursor('pointer');
		};

		menuItem.mouseExit = function(e) {
			textItem.setTextFillStyle(DR.constants.menuTextColor);
			CAAT.setCursor('default');
		};

		menuItem.mouseDown = function(e) {
			textItem.setTextFillStyle(DR.constants.menuTextPressColor);
		};

		menuItem.label = textItem;

		menuItem.addChild(textItem);
		this.addChild(menuItem);

		return menuItem;
	};

    CAAT.CurvePath.prototype.paint = function( director,bDrawHandles ) {
        this.curve.drawHandles= bDrawHandles;
        director.ctx.strokeStyle= this.color;
        director.ctx.lineWidth= 5;
        this.curve.paint(director,bDrawHandles);
    };

    /**
     * Convert radians to degrees
     * @param {number} radians Radians to convert
     * @returns {number} 0 to 360 degrees
     */
    CAAT.radiansToDegrees = function(radians) {
        return radians * (180 / Math.PI);
    };

    /**
     * Convert degrees to radians
     * @param {number} degrees 0 to 360 degrees
     * @returns {number} Numerical value of radians
     */
    CAAT.degreesToRadians = function(degrees) {
        return degrees * (Math.PI / 180);
    };

    CAAT.testCircleCircleIntersection = function(circle1, circle2) {
        var x = Math.abs(circle1.x - circle2.x),
            y = Math.abs(circle1.y - circle2.y),
            distanceBetweenCircles = Math.sqrt(x*x + y*y),
            distanceBetweenCirclesToCollide = (circle1.radius || 0) + (circle2.radius || 0);

        return distanceBetweenCircles <= distanceBetweenCirclesToCollide;
    };

    CAAT.Actor.prototype.remove = function() {
        this.setDiscardable(true);
        this.setExpired(true);
    };

}());