var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball, square;
var M = 10;
var RADIUS = 20;
var D = 1;
var Vo = 10; 

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
}

function integrate() {
    f = Hooke( ball.y - 200 ); //mechEq
    a = acceleration( f );
    ball.vy += a * 15/1000;  
    ball.y += ball.vy;
}

function render() {
    integrate();

    ctx.fillStyle = '#fff';
    ctx.fillRect( 0, 0, W, H );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, RADIUS, 0, 2 * Math.PI );
    ctx.stroke();

    setTimeout( render, 15 );
}

init();
render();
