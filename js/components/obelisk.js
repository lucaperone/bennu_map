class Obelisk {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx) {
        ctx.fillStyle = obelisk_color
        ctx.fillRect(this.x, this.y, obelisk_size * scale, obelisk_size * scale)
    }
}
