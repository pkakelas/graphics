var Ax, Ay, Bx, By;
var lineExists = false;
var c = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = c.getContext( '2d' );
var W = 700, H = 700;
var ball;
var G = 10;
var Gx = 0;
var Gy = G;
var anchor = false;
var RADIUS = 15;
var IMPACT = 0.8;
var ARROWHEAD_W = 15;

function init() {
    ball = {
        x: 350 - RADIUS,
        y: 70,
        vy: 0,
        vx: 0
    };
}

function integrate() {
    if ( !anchor ) {
        ball.vy += Gy * 15/1000;
        ball.vx += Gx * 15/1000;
    }
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
    if ( ball.y < RADIUS ) {
        ball.vy = - ball.vy * IMPACT;
        ball.y = RADIUS;
        ball.vx = ball.vx * IMPACT;
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

    if ( lineExists ) {
        /*
        ctx.beginPath();
        ctx.moveTo( Ax, Ay );
        ctx.lineTo( Bx, By );
        ctx.stroke();
        */
        
        ctx.save();
        ctx.translate( Ax, Ay );
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.rotate( Math.atan2( By - Ay, Bx - Ax ) );
        ctx.moveTo( 0, 0 );
        var x = Bx - Ax, y = By - Ay;
        var l = Math.sqrt( x * x + y * y );
        ctx.lineTo( l, 0 );
        ctx.stroke();
        ctx.moveTo( l, 0 );
        ctx.lineTo( l - ARROWHEAD_W, ARROWHEAD_W );
        ctx.lineTo( l - ARROWHEAD_W, - ARROWHEAD_W );
        ctx.fill();

        ctx.restore();
    }

    setTimeout( render, 15 ); //on change line 18 should be changed too
}

init();
render();
