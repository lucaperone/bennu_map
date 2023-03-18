// Constants
const width = 1920,
    height = 1080,
    bg_color = "#161e23",
    pyramid_color = "#f5b963",
    pyramid_size = 15,
    obelisk_color = "#e3e5e2",
    obelisk_size = 5,
    no_spawn_color = "#211c21",
    spawn_color = "#142921"

// Variables
let seed,
    debug,
    scale,
    players,
    influence,
    rings,
    obelisks,
    padding,
    min_dist,
    max_dist,
    ring_size,
    links

function draw() {
    // Parameters
    seed = document.getElementById("seed").value
    debug = document.getElementById("debug").checked
    scale = parseFloat(document.getElementById("scale").value)
    players = document.getElementById("players").value
    influence = document.getElementById("influence").value
    rings = document.getElementById("rings").value
    obelisks = document.getElementById("obelisks").value
    padding = document.getElementById("padding").value / 100
    min_dist = parseFloat(document.getElementById("min_dist").value)
    max_dist = parseFloat(document.getElementById("max_dist").value)
    ring_size = (max_dist - min_dist) / rings
    intra = parseFloat(document.getElementById("intra").value)
    inter = parseFloat(document.getElementById("inter").value)

    // Setup
    var canvas = document.getElementById("map")
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext("2d")

    const map = new Map(width, height, seed, players)
    map.draw(ctx, debug)
}

window.onresize = draw
for (let input of document.getElementsByClassName("parameter")) {
    input.addEventListener("input", draw)
}
draw()
