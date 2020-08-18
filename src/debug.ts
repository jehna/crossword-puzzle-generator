import { EmptyBoardPositions, BoardItem, StartPositionBoard } from "./board"
import crypto from "crypto"

export function printEmptyBoard(board: EmptyBoardPositions) {
  const data: string[] = Array(board.width * board.height).fill(BoardItem.BLOCK)
  for (const position of board.data) {
    for (let i = 0; i < position.length; i++) {
      let { x, y } = position.position
      if (position.direction === "horizontal") x += i + 1
      if (position.direction === "vertical") y += i + 1
      data[y * board.width + x] = BoardItem.EMPTY
    }
  }

  const ret: string[] = []
  for (let i = 0; i < board.height; i++) {
    ret.push(
      data.slice(i * board.width, i * board.width + board.width).join("")
    )
  }
  return ret.join("\n")
}

export function printHorizontal(board: StartPositionBoard) {
  const data: string[] = Array(board.width * board.height).fill(BoardItem.BLOCK)
  for (const position of board.data) {
    if (position.direction !== "horizontal") continue
    for (let i = 0; i < position.length; i++) {
      let { x, y } = position.position
      x += i + 1
      data[y * board.width + x] = position.word[i]
    }
  }

  const ret: string[] = []
  for (let i = 0; i < board.height; i++) {
    ret.push(
      data.slice(i * board.width, i * board.width + board.width).join("")
    )
  }
  return ret.join("\n")
}

export function printVertical(board: StartPositionBoard) {
  const data: string[] = Array(board.width * board.height).fill(BoardItem.BLOCK)
  for (const position of board.data) {
    if (position.direction !== "vertical") continue
    for (let i = 0; i < position.length; i++) {
      let { x, y } = position.position
      y += i + 1
      data[y * board.width + x] = position.word[i]
    }
  }

  const ret: string[] = []
  for (let i = 0; i < board.height; i++) {
    ret.push(
      data.slice(i * board.width, i * board.width + board.width).join("")
    )
  }
  return ret.join("\n")
}

type Exportable = {
  charIndices: number[]
  width: number
  height: number
  hash: string
  solved: { [index: number]: string }
}

export function toExportable(board: StartPositionBoard) {
  const chars = printHorizontal(board)
    .split("")
    .filter((c) => c !== BoardItem.BLOCK && c !== "\n")
  const charMap = [...new Set(chars)].sort(() => Math.random() - 0.5)
  const exportable: Exportable = {
    charIndices: chars.map((c) => charMap.indexOf(c)),
    width: board.width - 1,
    height: board.height - 1,
    hash: crypto.createHash("sha256").update(chars.join("")).digest("hex"),
    solved: charMap.reduce(
      (all, char, index) => Object.assign(all, { [index]: char }),
      {}
    )
  }
  return exportable
}
