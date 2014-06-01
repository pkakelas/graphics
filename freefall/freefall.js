var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball;
var G = 10;
var RADIUS = 15;
var IMPACT = 0.8;

function init() {
    ball = {
        x: 350 - RADIUS,
        y: 70,
        v: 0
    };
}

function integrate() {
    ball.v += G * 15/1000;
    ball.y += ball.v;
    if ( ball.y > H - RADIUS ) {
        ball.v = - ball.v * IMPACT;
        ball.y = H - RADIUS;
    }
}

function render() {
    integrate();

    ctx.fillStyle = '#fff';
    ctx.fillRect( 0, 0, W, H );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, RADIUS, 0, 2 * Math.PI );
    ctx.stroke();

    setTimeout( render, 15 ); //on change line 18 should be changed too
}

init();
render();
