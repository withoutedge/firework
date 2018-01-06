var fireworks = [];
var gravity;


function setup() {
    createCanvas(windowWidth,windowHeight);
    gravity = createVector(0, height*0.00007);
	
    colorMode(HSB, 360, 100, 100, 255);  
}

function draw() {
    background(0, 100, 0, 50);
    
    if(random()<0.3) {
 	   fireworks.push(new Firework());
	}

    for (firework of fireworks) {
    	firework.update();
    	firework.draw();
    }

    for (i = fireworks.length - 1; i >= 0; i--) {
    	if(fireworks[i].remove()) {
    		fireworks.splice(i, 1);
    	}
    }
}

function Firework() {
	this.firework = new Particle (random(width), height, 4, random(360));
	this.firework.velocity = createVector(0,-height*random(0.009,0.012));
	this.exploded = false;
	this.effects = [];

	this.draw = function() {
		if(this.exploded) {
			for(effect of this.effects) {
				effect.draw();
			}
		} else {
			this.firework.draw();
		}
	}

	this.explode = function() {
		for(let i = 1; i<= 70; i++) {
			let e = new Particle(this.firework.position.x, this.firework.position.y, 4);
			e.velocity = (p5.Vector.random2D().mult(random(2,3)));
			e.colour = this.firework.colour;
			this.effects.push(e);
		}
	}

	this.remove = function () {
		return (this.exploded && this.effects.length == 0)
	}

	this.update = function() {
		this.firework.applyForce(gravity);
		this.firework.update();
		if(this.exploded == false && this.firework.velocity.y >= -4) {
			this.explode();
			this.exploded = true;
		}
		for(let i = this.effects.length - 1; i>=0; i--) {
			this.effects[i].lifespan -= 2;
			if(this.effects[i].lifespan <=0){
				this.effects.splice(i, 1);
			} else {
				this.effects[i].applyForce(gravity);
				this.effects[i].update();	
			}
			
		}
	}
}

function Particle(x, y, mass = 1, colour = 100) {
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.mass = mass;
	this.lifespan = 100;
	this.colour = colour;
	this.saturation = 100;

	this.applyForce = function(force) {
		this.acceleration.add(force);
	}

	this.draw = function() {
		strokeWeight(this.mass);
		stroke(this.colour, this.saturation, 100, this.lifespan);
		point(this.position.x, this.position.y);
	}

	this.offscreen = function() {
		return (this.position.y > height + this.mass);
	}

	this.setVelocity = function(newVelocity = createVector(0,0)) {
		this.velocity = newVelocity;
	}

	this.update = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	
}