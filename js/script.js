function draw() {
    // Setup
    var main = document.getElementById("main")
    const { width, _ } = main.getBoundingClientRect()
    const height = (9 / 16) * width
    var canvas = document.getElementById("map")
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext("2d")

    // Constants
    const pyramid_color = "#f5b963",
        pyramid_size = 10,
        obelisk_color = "#e3e5e2",
        obelisk_size = 5

    // Parameters
    const seed = document.getElementById("seed").value,
        players = document.getElementById("players").value,
        scale = document.getElementById("scale").value,
        rings = document.getElementById("rings").value,
        obelisks = document.getElementById("obelisks").value

    // Pyramid

    ctx.fillStyle = "#f5b963"
    ctx.fillRect(
        (width - pyramid_size * scale) / 2,
        (height - pyramid_size * scale) / 2,
        pyramid_size * scale,
        pyramid_size * scale
    )
}

window.onresize = draw
for (let input of document.getElementsByClassName("parameter")) {
    input.addEventListener("input", draw)
}
draw()
