// Constants
const bg_color = "#161e23",
    pyramid_color = "#f5b963",
    pyramid_size = 15,
    obelisk_color = "#e3e5e2",
    obelisk_size = 5,
    link_color = "rgba(0,0,255,0.3)",
    link_size = 3,
    ring_width = 3,
    no_spawn_color = "#211c21",
    spawn_color = "#142921",
    range_color = "#3c3c3c",
    range_width = 1,
    max_steps = 100

// Variables
let algorithm,
    seed,
    width,
    height,
    scale,
    debug_padding,
    debug_distances,
    debug_spacing,
    players,
    players_influence,
    rings,
    obelisks,
    padding_x,
    padding_y,
    min_dist,
    max_dist,
    min_spacing,
    ring_size,
    intra_density,
    inter_density,
    max_link_length,
    distance_influence

function draw() {
    get = (id) => document.getElementById(id)
    // Parameters
    // - Setup
    algorithm = get("algorithm").value
    seed = get("seed").value
    width = get("width").value
    height = get("height").value
    scale = parseFloat(get("scale").value)
    // - Debug
    debug_padding = get("debug_padding").checked
    debug_distances = get("debug_distances").checked
    debug_spacing = get("debug_spacing").checked
    // - Players
    players = get("players").value
    players_influence = get("players_influence").value
    // - Spawning zone
    padding_x = get("padding_x").value / 100
    padding_y = get("padding_y").value / 100
    min_dist = parseFloat(get("min_dist").value)
    max_dist = parseFloat(get("max_dist").value)
    min_spacing = parseFloat(get("min_spacing").value)
    // - Rings algorithm
    rings = get("rings").value
    ring_size = (max_dist - min_dist) / rings
    obelisks = get("obelisks").value
    intra_density = parseFloat(get("intra_density").value)
    inter_density = parseFloat(get("inter_density").value)
    max_link_length = parseFloat(get("max_link_length").value)
    distance_influence = parseFloat(get("distance_influence").value)

    // Setup
    var canvas = get("map")
    canvas.width = width
    canvas.height = height
    canvas.style.aspectRatio = `${width} / ${height}`
    var ctx = canvas.getContext("2d")

    const map = new Map(width, height, seed, players)
    map.draw(ctx, {
        padding: debug_padding,
        distances: debug_distances,
        spacing: debug_spacing,
    })
}

window.onresize = draw
for (let input of document.getElementsByClassName("parameter")) {
    input.addEventListener("input", draw)
}
draw()
