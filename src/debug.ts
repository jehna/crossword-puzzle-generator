import { StartPosition } from "./board"

export function printHorizontal(board: StartPosition[]) {
  return board
    .sort((a, b) => a.position.y - b.position.y)
    .filter((p) => p.direction === "horizontal")
    .map((p) => p.word)
    .join("\n")
}

export function printVertical(board: StartPosition[]) {
  return board
    .sort((a, b) => a.position.x - b.position.x)
    .filter((p) => p.direction === "vertical")
    .map((p) => p.word)
    .reduce((p, c, i) => {
      for (let ii = 0; ii < c.length; ii++) {
        p[ii] = p[ii] || []
        p[ii][i] = c[ii]
      }
      return p
    }, [] as string[][])
    .map((p) => p.join(""))
    .join("\n")
}
