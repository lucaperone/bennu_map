class Pyramid {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx) {
        ctx.fillStyle = pyramid_color
        ctx.fillRect(this.x, this.y, pyramid_size * scale, pyramid_size * scale)
    }
}
