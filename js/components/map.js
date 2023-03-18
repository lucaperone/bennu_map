class Map {
    constructor(w, h, s, p) {
        this.w = w
        this.h = h
        this.s = s
        this.p = p
        this.pyramid = new Pyramid(
            (this.w - pyramid_size * scale) / 2,
            (this.h - pyramid_size * scale) / 2
        )
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
                const angle = random.floating({ min: 0, max: 2 * Math.PI })
                const x = this.w / 2 + Math.cos(angle) * mag
                const y = this.h / 2 + Math.sin(angle) * mag

                if (
                    x >= this.w * padding &&
                    x <= this.w * (1 - padding) &&
                    y >= this.h * padding &&
                    y <= this.h * (1 - padding)
                ) {
                    this.obelisks.push(new Obelisk(x, y))
                }
            }
        }

        // TODO: use link density
        // TODO: link density intra and inter link
        const n = this.obelisks.length
        this.adjacency = []
        for (let _ = 0; _ < n; _++) {
            const row = []
            for (let _ = 0; _ < n; _++) {
                row.push(random.integer({ min: 0, max: 1 }))
            }
            this.adjacency.push(row)
        }
    }

    draw(ctx, debug) {
        if (debug) {
            // Maximum distance
            ctx.beginPath()
            ctx.fillStyle = spawn_color
            ctx.arc(this.w / 2, this.h / 2, max_dist, 0, 2 * Math.PI)
            ctx.fill()

            // Minimum distance
            ctx.beginPath()
            ctx.fillStyle = no_spawn_color
            ctx.arc(this.w / 2, this.h / 2, min_dist, 0, 2 * Math.PI)
            ctx.fill()

            // Rings
            for (let i = 1; i < rings; i++) {
                ctx.beginPath()
                ctx.strokeStyle = bg_color
                ctx.lineWidth = 3
                ctx.arc(
                    this.w / 2,
                    this.h / 2,
                    min_dist + i * ring_size,
                    0,
                    2 * Math.PI
                )
                ctx.stroke()
            }

            // Padding
            ctx.fillStyle = no_spawn_color
            ctx.fillRect(0, 0, this.w, this.h * padding)
            ctx.fillRect(0, this.h, this.w, -this.h * padding)
            ctx.fillRect(0, 0, this.w * padding, this.h)
            ctx.fillRect(this.w, 0, -this.w * padding, this.h)
        }

        // Pyramid
        this.pyramid.draw(ctx)

        // Obelisks
        this.obelisks.forEach((obelisk) => {
            obelisk.draw(ctx)
        })
    }
}

// from obelisk import Obelsik
// from pyramid import Pyramid
// import random

// MULTIPLIER = 2

// class Map:
//     def __init__(self, w, h, p, s):
//         self.w: int = w  # Width
//         self.h: int = h  # Height
//         self.p: int = p  # Number of players
//         self.s: int = s  # seed
//         self.pyramid: Pyramid = Pyramid(w / 2, h / 2)
//         self.obelisks: list[Obelsik] = []
//         self.adjacency: list[list[int]] = []

//         self.generate(self.s)

//     def generate(self, seed):
//         random.seed = seed
//         n = self.p * MULTIPLIER
//         for _ in range(n):
//             self.obelisks.append(
//                 Obelsik(random.uniform(0.0, self.w), random.uniform(0.0, self.h))
//             )

//         self.adjacency = [[random.randint(0, 1) for _ in range(n)] for _ in range(n)]
