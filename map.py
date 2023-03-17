from obelisk import Obelsik
from pyramid import Pyramid
import random

MULTIPLIER = 2


class Map:
    def __init__(self, w, h, p, s):
        self.w: int = w  # Width
        self.h: int = h  # Height
        self.p: int = p  # Number of players
        self.s: int = s  # seed
        self.pyramid: Pyramid = Pyramid(w / 2, h / 2)
        self.obelisks: list[Obelsik] = []
        self.adjacency: list[list[int]] = []

        self.generate(self.s)

    def generate(self, seed):
        random.seed = seed
        n = self.p * MULTIPLIER
        for _ in range(n):
            self.obelisks.append(
                Obelsik(random.uniform(0.0, self.w), random.uniform(0.0, self.h))
            )

        self.adjacency = [[random.randint(0, 1) for _ in range(n)] for _ in range(n)]
