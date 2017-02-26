var lifespan = 400;
var population;
var lifeTime = 0;
var target;
var maxMag = 0.2;
var rx = 250;
var ry = 150;
var rw = 100;
var rh = 10;

function setup() {
    var cnv = createCanvas(600, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    population = new Population();
    target = createVector(width / 2, 50);

}

function draw() {
    background(230, 0, 120);
    ellipse(target.x, target.y, 10, 10);
    fill(255);
    rect(rx, ry, rw, rh);
    population.run();
    lifeTime++;
    if (lifeTime == lifespan) {
        population.evaluate();
        population.selection();
        lifeTime = 0;
    }
}

function DNA(genes) {
    if (genes) {
        this.genes = genes;
    }
    else {
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxMag);
        }
    }
    this.crossover = function (partner) {
        var newgenes = [];
        var pivot = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > pivot) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }

    this.mutation = function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.05) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxMag);
            }
        }
    }
}

function Population() {
    this.rockets = [];
    this.popsize = 150;

    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }
    this.evaluate = function () {
        var maxfit = 0;
        var fewestSteps = 9999;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].completed) {
                fewestSteps = this.rockets[i].whenCompeted;
            }
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }

        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
            if (this.rockets[i].whenCompeted == fewestSteps) {
                this.rockets[i].fitness * 100;
            }
        }

        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
    }

    this.selection = function () {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            if (random(1) < 0.5) {
                child.mutation();
            }
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }
    this.run = function () {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].draw();
        }
    }
}

function Rocket(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.whenCompeted = 9999;
    this.dna = dna || new DNA();


    this.applyFoce = function (force) {
        this.acc.add(force);
    }
    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);

        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= 50;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    }
    this.update = function () {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
            this.whenCompeted = lifeTime;
        }

        if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
            this.crashed = true;
        }

        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }

        this.applyFoce(this.dna.genes[lifeTime])
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    this.draw = function () {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
}