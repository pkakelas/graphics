var VELOCITY_MULTIPLIER = 0.1;
var rotating = false;

$( 'canvas' ).mousedown( function( e ) {
    Ax = ball.x = e.clientX - $( 'canvas' ).offset().left;
    Ay = ball.y = e.clientY - $( 'canvas' ).offset().top;
    ball.vx = ball.vy = 0;
    anchor = lineExists = true;
} );
$( document ).mousemove( function( e ) {
    if ( lineExists ) {
        Bx = e.clientX - $( 'canvas' ).offset().left;
        By = e.clientY - $( 'canvas' ).offset().top;
    }
    if ( rotating ) {
        Bx = e.clientX;
        By = e.clientY;
        var angle = Math.atan2( By - Ay, Bx - Ax );
        if ( angle < 0 ) {
            angle += 2 * Math.PI;
        }
        Gx = G * Math.sin( angle );
        Gy = G * Math.cos( angle );
        angle *= 360 / ( 2 * Math.PI );
        angle = Math.round( angle );
        $( 'canvas' ).css( 'transform', 'rotate(' + angle + 'deg )' );
    }
} );
$( document ).mouseup( function( e ) {
    if ( lineExists ) {
        ball.vx = VELOCITY_MULTIPLIER * ( Bx - Ax );
        ball.vy = VELOCITY_MULTIPLIER * ( By - Ay );
        anchor = lineExists = false;
    }
    if ( rotating ) {
        rotating = false;
    }
} );

$( 'button' ).mousedown( function( e ) {
    Ax = $( document ).width() / 2;
    Ay = $( document ).height() / 2;
    rotating = true;
} );
