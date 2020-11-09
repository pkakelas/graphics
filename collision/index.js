const OPACITY = 0.1
let ctx = getContext()
let W = window.innerWidth
let H = window.innerHeight

addEventListener('resize', () => {
    W  = window.innerWidth
    H = window.innerHeight
    ctx = getContext()
})

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.color = color
    }

    update(ctx) {
        if (this.doesHitWall('upper') || this.doesHitWall('lower')) {
            this.dy = -this.dy
        }
        if (this.doesHitWall('left') || this.doesHitWall('right')) {
            this.dx = -this.dx
        }

        this.x += this.dx
        this.y += this.dy

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
    }

    doesHitWall(side) {
        switch (side) {
            case 'lower':
                return this.y + this.radius > H
            case 'upper':
                return this.y - this.radius < 0
            case 'right':
                return this.x + this.radius > W
            case 'left':
                return this.x - this.radius < 0
        }
    }
}

//If dx and dy are the same it will get caught in a loop.
const balls = []
for (let _ = 0; _ < 10; ++_) {
    const ball = new Ball(
        getRandomInt(0, innerWidth),
        getRandomInt(0, innerHeight),
        getRandomInt(1, 10),
        getRandomInt(1, 10),
        30,
        getRandomColor(),
    )
    console.log(ball)

    balls.push(ball)
}
const animate = () => {
    requestAnimationFrame(animate)
    ctx.fillStyle = `rgba(33, 33, 33, ${OPACITY})`
    ctx.fillRect(0, 0, W, H)

    for (const ball of balls) {
        ball.update(ctx)
    }
}

animate()