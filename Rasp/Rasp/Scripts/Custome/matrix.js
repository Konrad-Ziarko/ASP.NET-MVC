var width;
var height;
var symbolSize = 20;
var r;

function setup() {
    width = document.getElementById('game').offsetWidth;
    height = window.innerHeight - 50;
    createCanvas(width, height);
    background(0, 150);
    textSize(symbolSize);

    r = new Rain();
    r.initRain();
}

function draw() {
    background(0, 100);
    r.drawRain();
}

Rain.prototype.initRain = function () {
    for (var i = 0; i < this.numberOfStreams; i++) {
        var s = new Stream(i*symbolSize);
        s.initStream();
        this.streams.push(s);
    }
}
Rain.prototype.drawRain = function () {
    this.streams.forEach(function (stream) {
        stream.drawStream();
    })
}
function Rain() {
    this.streams = [];
    this.numberOfStreams = round(width/symbolSize);
}

Stream.prototype.initStream = function () {
    var y = round(random(-900, -100));
    for (var i = 0; i < this.maxSymbols; i++) {
        this.symbols.push(new Symbol(this.x, y, this.speed, i == 0));
        y -= symbolSize;
    }
}

Stream.prototype.drawStream = function () {
    this.symbols.forEach(function (symbol) {
        fill(0, 255, 50, 255);
        if (symbol.brightColor) {
            noStroke();
            fill(255, 255, 255, 50);
            var diff = 16;
            textSize(symbolSize + diff);
            text(symbol.innerChar, symbol.X - diff / 2, symbol.Y - diff + 2);
            textSize(symbolSize);
            fill(120, 255, 160, 255);
        }
        text(symbol.innerChar, symbol.X, symbol.Y);
        symbol.moveDown();
        symbol.nextRandomChar();
    });
}
function Stream(inX) {
    this.symbols = [];
    this.maxSymbols = round(random(5, 30));
    this.speed = random(3, 5);
    this.x = inX;
}

Symbol.prototype.nextRandomChar = function () {
    if (frameCount % this.switchInterval == 0)
        this.innerChar = String.fromCharCode(0x30A0 + round(random(0, 96)));
}

Symbol.prototype.moveDown = function () {
    this.Y += this.Speed;
    if (this.Y >= height) {
        this.Y = 0;
    }
}
function Symbol(x, y, speed, isFirst) {
    this.innerChar = String.fromCharCode(0x30A0 + round(random(0, 96)));
    this.brightColor = isFirst && (round(random(0, 5)) <= 2);
    this.X = x;
    this.Y = y;
    this.Speed = speed;
    this.switchInterval = round(random(15, 60));
}