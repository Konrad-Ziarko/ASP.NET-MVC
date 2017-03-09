var width;
var height;
var font;
var word = 'Konrad';
var dots = [];
function preload() {
    font = loadFont('/fonts/Asimov.otf');
}

function setup() {
    var w = 800;
    var h = 600;
    var cnv = createCanvas(w, h);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);

    background(0, 150);
    var points = font.textToPoints(word, 100, 200, 192, {
        sampleFactor: 0.25
    });

    points.forEach(function (point) {
        dots.push(new Dot(point.x, point.y));
    });
}


function changeWord() {
    word = document.getElementById('newWordTextBox').value;

    words = word.split(' ');
    var modif = 0;
    var points = [];
    for (var c = 0 ; c < words.length; c++) {
        var newPoints = font.textToPoints(words[c], 100, 200 + modif, 192, {
            sampleFactor: 0.25
        });
        modif += 192;
        newPoints.forEach(function (element) {
            points.push(element);
        });
    }
    
    
    var newDots = [];
    points.forEach(function (point) {
        newDots.push(new Dot(point.x, point.y));
    });

    for (var i =0;i<newDots.length;i++){
        if (dots[i] != null) {
            newDots[i].position = dots[i].position;
        }
    }
    dots = newDots;
}

function draw(){
    background(0, 120);
    dots.forEach(function (dot) {
        dot.behaviors();
        dot.tick();
        dot.draw();
    });
}

function Dot(x, y) {
    this.position = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.radius = 5;
    this.maxSpeed = 5;
    this.maxMag = 0.3;

    this.seek = function (target) {
        var desired = p5.Vector.sub(target, this.position);
        var distance = desired.mag();
        var speed = this.maxSpeed;
        if (distance < 100)
            speed = map(distance, 0, 100, 0, this.maxSpeed);
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxMag);
        return steer;
    }
    this.flee = function (target) {
        var desired = p5.Vector.sub(target, this.position);
        var distance = desired.mag();
        if (distance < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxMag);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }
    this.moveTo = function (target) {
        this.acceleration.add(target);
    }
    this.behaviors = function () {
        var seek = this.seek(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);
        flee.mult(5);
        this.moveTo(seek);
        this.moveTo(flee);
    }
    this.tick = function () {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }
    this.draw = function () {
        stroke(255);
        strokeWeight(5);
        point(this.position.x, this.position.y);
    }
}