import enum
import dataclasses

print(enum)
print(dataclasses)

class Direction(enum.Enum):
    FORWARD = 0
    LEFT = 3
    RIGHT = 1
    BACK = 2

    def combine(self, other):
        return Direction((self.value + other.value) % 4)

    def __add__(self, other):
        return self.combine(other)


print(Direction.FORWARD)
print(Direction.BACK)
print(Direction(2))
print(Direction.BACK + Direction.LEFT)
