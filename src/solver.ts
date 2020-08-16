import words from "../words.json"
import assert from "assert"
import { Direction, EmptyPosition, StartPosition } from "./board"

const MAX_TIME_MS = 10000
const wordIndices = words.map((_, i) => i)

type ProgressPosition = EmptyPosition & {
  possibleWordsIndices: number[]
  cachedPossibleWordsIndices: number[]
  selectedWordIndex: undefined | number
}

export function solve(empty: EmptyPosition[]): StartPosition[] {
  let iterations = 0
  const startTime = Date.now()
  const positions: ProgressPosition[] = empty
    .map((p) => ({
      ...p,
      possibleWordsIndices: wordIndices.filter(
        (i) => words[i].length === p.length
      ),
      selectedWordIndex: undefined
    }))
    .map((p) => ({ ...p, cachedPossibleWordsIndices: p.possibleWordsIndices }))
  const positionsMap: {
    [key: string]: { index: number; position: ProgressPosition }
  } = {}
  for (const position of positions) {
    for (let i = 0; i < position.length; i++) {
      let { x, y } = position.position
      if (position.direction === "horizontal") {
        x += i + 1
      } else if (position.direction === "vertical") {
        y += i + 1
      }
      Object.assign(positionsMap, {
        [`${x},${y},${position.direction}`]: { index: i, position }
      })
    }
  }

  main: while (startTime + MAX_TIME_MS > Date.now()) {
    iterations++
    positions.forEach((p) => {
      p.possibleWordsIndices = p.cachedPossibleWordsIndices
      p.selectedWordIndex = undefined
    })

    while (positions.some((p) => p.selectedWordIndex === undefined)) {
      positions.sort(
        (a, b) => a.possibleWordsIndices.length - b.possibleWordsIndices.length
      )

      const closest = positions.find((p) => p.selectedWordIndex === undefined)!
      const possibleWordsIndices = closest.possibleWordsIndices
      const randomIndex =
        possibleWordsIndices[
          Math.floor(Math.random() * possibleWordsIndices.length)
        ]
      closest.selectedWordIndex = randomIndex

      const dir: Direction =
        closest.direction === "horizontal" ? "vertical" : "horizontal"
      for (let i = 0; i < closest.length; i++) {
        let { x, y } = closest.position
        if (closest.direction === "horizontal") {
          x += i + 1
        } else if (closest.direction === "vertical") {
          y += i + 1
        }

        const pos = positionsMap[`${x},${y},${dir}`]
        assert(pos)

        if (pos.position.selectedWordIndex !== undefined) {
          assert.strictEqual(
            words[pos.position.selectedWordIndex][pos.index],
            words[closest.selectedWordIndex!][i]
          )
          continue
        }

        pos.position.possibleWordsIndices = pos.position.possibleWordsIndices.filter(
          (wi) =>
            wi !== randomIndex &&
            words[wi][pos.index] === words[closest.selectedWordIndex!][i]
        )

        if (pos.position.possibleWordsIndices.length === 0) continue main
      }
    }
    return positions.map(
      ({ direction, length, position, selectedWordIndex }) => ({
        direction,
        length,
        position,
        word: words[selectedWordIndex!]
      })
    )
  }

  console.error(`No solution found in ${iterations} iterations`)
  return process.exit(0) as []
}
