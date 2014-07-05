W = 1000;
H = 900;
OMEGA = 0.03;

function Vector( x, y, z, theta, omega ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = getRandomColor();
    if ( typeof theta == 'undefined' ) {
        this.theta = 0;
    }
    else {
        this.theta = theta;
    }
    if ( typeof omega == 'undefined' ) {
        this.omega = OMEGA;
    }
    else {
        this.omega = omega;
    }

    this.copy = function() {
        return new Vector( this.x, this.y, this.z, this.theta, this.omega, this.color );
    }
}

var initialCube = [];

for (var i = 0; i < 800; ++i) {
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
        var z = p.z + 2.5;
        x /= z;
        y /= z;
        ctx.moveTo( x, y );
        ctx.lineTo( x + 0.01, y + 0.01 );
        opacity = 1 - ( p.z + 1 ) / 2;
        opacity *= opacity;
        opacity = Math.round( opacity * 100 ) / 100;
        ctx.globalAlpha = 0.25; 
        ctx.strokeStyle = p.color;
        ctx.stroke();
    }
}

function integrate() {
    transform();
    render();
    setTimeout( integrate, 17 );
}

integrate();
