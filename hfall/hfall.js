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
        vy: 0,
        vx: 10
    };
}

function integrate() {
    ball.vy += G * 15/1000;
    ball.y += ball.vy;
    ball.x += ball.vx;
    if ( ball.y > H - RADIUS ) {
        ball.vy = - ball.vy * IMPACT;
        ball.y = H - RADIUS;
    }
    if ( ball.x < RADIUS ) {
        ball.vx = - ball.vx * IMPACT;
        ball.x = RADIUS;
        ball.vy = ball.vy * IMPACT;
    }
    if ( ball.x > W - RADIUS ) {
        ball.vx = - ball.vx * IMPACT;
        ball.x = W - RADIUS;
        ball.vy = ball.vy * IMPACT;
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
