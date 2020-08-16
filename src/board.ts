export type Direction = "horizontal" | "vertical"

export type EmptyPosition = {
  direction: Direction
  length: number
  position: {
    x: number
    y: number
  }
}

export type StartPosition = EmptyPosition & {
  word: string
}

export function createEmptyBoard(
  width: number,
  height: number
): EmptyPosition[] {
  const board: EmptyPosition[] = []
  for (let x = 1; x < width; x++) {
    board.push({
      direction: "vertical",
      length: height - 1,
      position: { x, y: 0 }
    })
  }
  for (let y = 1; y < height; y++) {
    board.push({
      direction: "horizontal",
      length: width - 1,
      position: { y, x: 0 }
    })
  }
  return board
}
