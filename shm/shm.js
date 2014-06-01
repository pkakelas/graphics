var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball;
var M = 10;
var RADIUS = 15;
var D = 1;
var mechEq = 350 - RADIUS

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
        x: mechEq,
        y: 350 - RADIUS,
        vy: 0,
        vx: 10 
    };
}

function integrate() {
    f = Hooke( ball.x - mechEq );
    a = acceleration( f );
    ball.vx += a * 15/1000;  
    ball.x += ball.vx;
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
