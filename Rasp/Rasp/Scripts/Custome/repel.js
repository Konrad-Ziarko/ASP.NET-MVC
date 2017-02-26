var width;
var height;
function setup() {
    width = document.getElementById('game').offsetWidth;
    height = window.innerHeight - 50;
    createCanvas(width, height);
    background(0, 150);
    textSize(symbolSize);

    s = new Rain();
    s.initRain();
}

function setup() {
    width = document.getElementById('game').offsetWidth;
    height = window.innerHeight - 50;
    createCanvas(width, height);
    background(0, 150);

}


function draw(){
    background(0, 120);

}