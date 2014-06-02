var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball, square;
var M = 10;
var RADIUS = 20, SIDE = 40;
var D = 1;
var Vo = 10; 
var A = 263;
var t = -2;

// Hooke law
function Hooke( x ) {
    return - D * x;
}

// 2nd Neuton law
function acceleration( f ) {
    return f / M;
}

function init() {
    ball = {
        x: W / 2 - RADIUS,
        y: 320,
        vy: 0,
        vx: Vo 
    };
    square = {
        x: W / 2 - SIDE,
        y: 450
    };
}

function integrate() {
    f = Hooke( ball.x - W / 2 - RADIUS );
    a = acceleration( f );
    ball.vx += a * 15/1000;  
    ball.x += ball.vx;

    w = Math.sqrt( D / M );
    square.x = A * Math.sin( Math.sqrt( 15 / 1000 ) * w * t   ) + W / 2;
    ++t;
}

function render() {
    integrate();

    ctx.fillStyle = '#fff';
    ctx.fillRect( 0, 0, W, H );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, RADIUS, 0, 2 * Math.PI );
    ctx.stroke();

    ctx.beginPath();
    ctx.rect( square.x, square.y, SIDE, SIDE );
    ctx.stroke();

    setTimeout( render, 15 );
}

init();
render();
