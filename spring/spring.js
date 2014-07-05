var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball, square;
var M = 10;
var RADIUS = 20;
var D = 1;

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
        vx: 0 
    };
}

function renderCeiling() {
    for ( var i = 0; i < 20; ++i ) {
        dist = ( W + 20 ) / 20;
        ctx.beginPath();
        ctx.moveTo( dist * i, 50 );
        ctx.lineTo( dist * i + 20, 0 );
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo( 0, 50 );
    ctx.lineTo( W, 50 );
    ctx.stroke();
}

function renderSpring() {
    dx = W / 2 - RADIUS;
    dist = ( ball.y - 50 ) / 10;
    for ( var i = 0; i < 10; ++i ) {
        if ( i % 2 == 0 ) {
            dx = ball.x += 40;
        }
        else {
            dx = ball.x -= 40;
        }
        ctx.beginPath();
        ctx.moveTo( dx, dist );
        ctx.lineTo( dx, dist );
        ctx.stroke();
    }
}

function integrate() {
    f = Hooke( ball.y - 200 ); //mechEq
    a = acceleration( f );
    ball.vy += a * 15/1000;  
    ball.y += ball.vy;
}

function render() {
    integrate();
    renderCeiling();

    ctx.fillStyle = '#fff';
    ctx.fillRect( 0, 52, W, H );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, RADIUS, 0, 2 * Math.PI );
    ctx.stroke();

    renderSpring();

    setTimeout( render, 15 );
}

renderCeiling();
init();
render();
