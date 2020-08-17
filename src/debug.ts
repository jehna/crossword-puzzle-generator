import {
  StartPosition,
  EmptyPosition,
  EmptyBoardPositions,
  BoardItem,
  StartPositionBoard
} from "./board"

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
