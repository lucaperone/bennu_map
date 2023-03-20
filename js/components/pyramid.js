class Pyramid {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx) {
        square(ctx, this.x, this.y, pyramid_size, pyramid_color)
    }
}
