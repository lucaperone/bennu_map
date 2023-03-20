class Obelisk {
    constructor(x, y, ring) {
        this.x = x
        this.y = y
        this.ring = ring
    }

    draw(ctx) {
        square(ctx, this.x, this.y, obelisk_size, obelisk_color)
    }
}
