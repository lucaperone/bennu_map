import matplotlib.pyplot as plt
from map import Map

WIDTH = 1280
HEIGHT = 720
DPI = 100
PLAYERS = 3
SEED = 42

if __name__ == "__main__":
    m = Map(WIDTH, HEIGHT, PLAYERS, SEED)
    plt.figure(figsize=(WIDTH / DPI, HEIGHT / DPI), dpi=DPI)
    plt.xlim(0, WIDTH)
    plt.ylim(0, HEIGHT)

    for i in range(len(m.obelisks)):
        for j in range(len(m.obelisks)):
            if m.adjacency[i][j] == 1:
                plt.plot(
                    [m.obelisks[i].x, m.obelisks[j].x],
                    [m.obelisks[i].y, m.obelisks[j].y],
                    "#0a9bdf",
                )

    plt.scatter(
        [o.x for o in m.obelisks], [o.y for o in m.obelisks], 20, "#3c3c3c", "s"
    )

    plt.scatter(m.pyramid.x, m.pyramid.y, 50, "#ad9b80", "^")

    plt.show()
