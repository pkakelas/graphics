W = 1300;
H = 900;

function Vector( x, y, z, theta, omega ) {
    this.x = x;
    this.y = y;
    this.z = z;
    if ( typeof theta == 'undefined' ) {
        this.theta = 0;
    }
    else {
        this.theta = theta;
    }
    if ( typeof omega == 'undefined' ) {
        this.omega = 0.02;
    }
    else {
        this.omega = omega;
    }

    this.copy = function() {
        return new Vector( this.x, this.y, this.z, this.theta, this.omega );
    }
}

var initialCube = [];

for (var i = 0; i < 1000; ++i) {
    initialCube.push( new Vector( Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2 ) );
}

var cube = [], theta = 0;

for (var i = 0; i < initialCube.length; i++) {
    cube.push( initialCube[ i ].copy() );
}

function transform() {
    for (var i = 0; i < cube.length; i++) {
        var pInitial = initialCube[ i ];
        var p = cube[ i ];
        p.theta += p.omega;
        p.x = pInitial.x * Math.cos( p.theta ) - pInitial.z * Math.sin( p.theta );
        p.z = pInitial.x * Math.sin( p.theta ) + pInitial.z * Math.cos( p.theta );
    }
}

var canvas = document.getElementsByTagName( "canvas" )[ 0 ];
var ctx = canvas.getContext( '2d' );
ctx.scale( W / 4, H / 4 );
ctx.translate( 2, 2 );
ctx.lineWidth = 0.01;

function render() {
    ctx.fillStyle = 'black';
    ctx.fillRect( -2, -2, 4, 4 );
    for (var i = 0; i < cube.length; i++) {
        var p = cube[ i ];
        ctx.beginPath();
        var x = p.x, y = p.y;
        var z = p.z + 3;
        x /= z;
        y /= z;
        ctx.moveTo( x, y );
        ctx.lineTo( x + 0.01, y + 0.01 );
        opacity = 1 - ( p.z + 1 ) / 2;
        opacity *= opacity;
        opacity = Math.round( opacity * 100 ) / 100;
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        ctx.stroke();
    }
}

function integrate() {
    transform();
    render();
    setTimeout( integrate, 17 );
}

integrate();
