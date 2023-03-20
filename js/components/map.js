function square(ctx, x, y, s, c) {
    ctx.fillStyle = c
    s *= scale
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

function disk(ctx, x, y, r, c) {
    const prevStyle = ctx.fillStyle
    ctx.beginPath()
    ctx.fillStyle = c
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = prevStyle
}

function circle(ctx, x, y, r, s, c) {
    const prevStyle = ctx.strokeStyle
    const prevWidth = ctx.lineWidth
    ctx.beginPath()
    ctx.strokeStyle = c
    ctx.lineWidth = s
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.strokeStyle = prevStyle
    ctx.lineWidth = prevWidth
}

function line(ctx, x1, y1, x2, y2, s, c) {
    const prevStyle = ctx.strokeStyle
    const prevWidth = ctx.lineWidth
    ctx.strokeStyle = c
    ctx.lineWidth = s * scale
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.strokeStyle = prevStyle
    ctx.lineWidth = prevWidth
}

class Map {
    constructor(w, h, s, p) {
        this.w = w
        this.h = h
        this.s = s
        this.p = p
        this.pyramid = new Pyramid(this.w / 2, this.h / 2)
        this.obelisks = []
        this.adjacency = []

        this.generate(this.s)
    }

    generate(seed) {
        const random = new Chance(seed)

        for (let ring = 0; ring < rings; ring++) {
            for (let obelisk = 0; obelisk < obelisks; obelisk++) {
                const mag =
                    min_dist +
                    ring * ring_size +
                    random.floating({ min: 0, max: ring_size })
                let x,
                    y,
                    found = false
                for (let step = 0; step < max_steps; step++) {
                    const angle = random.floating({ min: 0, max: 2 * Math.PI })
                    x = this.w / 2 + Math.cos(angle) * mag
                    y = this.h / 2 + Math.sin(angle) * mag
                    if (
                        !this.obelisks.some(
                            (obelisk) =>
                                (x - obelisk.x) ** 2 + (y - obelisk.y) ** 2 <
                                min_spacing ** 2
                        )
                    ) {
                        found = true
                        break
                    }
                }
                // FIXME: for else ?

                if (
                    found &&
                    x >= this.w * padding_x &&
                    x <= this.w * (1 - padding_x) &&
                    y >= this.h * padding_y &&
                    y <= this.h * (1 - padding_y)
                ) {
                    this.obelisks.push(new Obelisk(x, y, ring))
                }
            }
        }

        // FIXME: prefill array ?
        const n = this.obelisks.length
        this.adjacency = []
        for (let i = 0; i < n; i++) {
            const row = []
            for (let j = 0; j < n; j++) {
                if (i >= j) {
                    row.push(false)
                    continue
                }

                const d2 =
                    (this.obelisks[i].x - this.obelisks[j].x) ** 2 +
                    (this.obelisks[i].y - this.obelisks[j].y) ** 2
                if (d2 > max_link_length ** 2) {
                    row.push(false)
                    continue
                }

                const d = Math.sqrt(d2)
                const rand = random.floating({ min: 0, max: 2 })
                const threshold = (d / max_link_length) * distance_influence

                if (rand < threshold) {
                    row.push(false)
                    continue
                }

                if (
                    this.obelisks[i].ring == this.obelisks[j].ring &&
                    rand < intra_density
                ) {
                    {
                        row.push(true)
                        continue
                    }
                } else if (
                    this.obelisks[i].ring != this.obelisks[j].ring &&
                    rand < inter_density
                ) {
                    {
                        row.push(true)
                        continue
                    }
                }
                row.push(false)
            }
            this.adjacency.push(row)
        }
    }

    draw(ctx, debug) {
        // Distances from pyramid
        if (debug.distances) {
            // Maximum distance
            disk(ctx, this.w / 2, this.h / 2, max_dist, spawn_color)

            // Minimum distance
            disk(ctx, this.w / 2, this.h / 2, min_dist, no_spawn_color)

            // Rings
            for (let i = 1; i < rings; i++) {
                circle(
                    ctx,
                    this.w / 2,
                    this.h / 2,
                    min_dist + i * ring_size,
                    ring_width,
                    bg_color
                )
            }
        }

        // Padding
        if (debug.padding) {
            ctx.fillStyle = no_spawn_color
            ctx.fillRect(0, 0, this.w, this.h * padding_y)
            ctx.fillRect(0, this.h, this.w, -this.h * padding_y)
            ctx.fillRect(0, 0, this.w * padding_x, this.h)
            ctx.fillRect(this.w, 0, -this.w * padding_x, this.h)
        }

        // Spacing
        if (debug.spacing) {
            for (const obelisk of this.obelisks) {
                disk(ctx, obelisk.x, obelisk.y, min_spacing, no_spawn_color)
            }
            for (const obelisk of this.obelisks) {
                circle(
                    ctx,
                    obelisk.x,
                    obelisk.y,
                    min_spacing / 2,
                    range_width,
                    range_color
                )
            }
        }

        // Links
        const n = this.obelisks.length
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (this.adjacency[i][j]) {
                    line(
                        ctx,
                        this.obelisks[i].x,
                        this.obelisks[i].y,
                        this.obelisks[j].x,
                        this.obelisks[j].y,
                        link_size,
                        link_color
                    )
                }
            }
        }

        // Pyramid
        this.pyramid.draw(ctx)

        // Obelisks
        for (const obelisk of this.obelisks) {
            obelisk.draw(ctx)
        }
    }
}
