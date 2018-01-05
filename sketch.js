var fireworks = [];
var gravity;

function setup() {
    createCanvas(windowWidth,windowHeight);
    gravity = createVector(0,1);
    for (let i = 1; i<=10; i++) {
    	fireworks.push(new Firework());
    }
}

function draw() {
    background(100);
    stroke(255);
    strokeWeight(40);
    for (firework of fireworks) {
    	firework.update();
    	firework.draw();
    }
}

function Firework() {
	this.firework = new Particle (random(width),random(height),random(10,15));

	this.draw = function() {
		this.firework.draw();
	}

	this.update = function() {
		this.firework.applyForce(gravity);
		this.firework.update();
	}
}

function Particle(x, y, mass = 10) {
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.mass = mass;

	this.applyForce = function(force) {
		this.acceleration.add(force);
	}

	this.draw = function() {
		strokeWeight(this.mass);
		point(this.position.x, this.position.y);
	}

	this.update = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
}