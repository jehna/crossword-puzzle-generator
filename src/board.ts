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

export type StartPositionBoard = {
  data: StartPosition[]
  width: number
  height: number
}

type EmptyBoard = {
  data: BoardItem[]
  width: number
  height: number
}

export enum BoardItem {
  EMPTY = "_",
  BLOCK = "%"
}

const MAX_ITERATIONS = 1000

function createFilledBoard(
  width: number,
  height: number,
  numBlocks: number
): EmptyBoard {
  let boardData: BoardItem[] = Array(width * height).fill(BoardItem.EMPTY)
  for (let i = 0; i < width; i++) boardData[i] = BoardItem.BLOCK
  for (let i = 0; i < height; i++) boardData[i * width] = BoardItem.BLOCK

  const numInitialBlocks = boardData.filter((b) => b === BoardItem.BLOCK).length
  let iterations = 0
  while (
    boardData.filter((b) => b === BoardItem.BLOCK).length <
    numInitialBlocks + numBlocks
  ) {
    const x = Math.floor(Math.random() * (width - 1))
    const y = Math.floor(Math.random() * (height - 1))
    const newBoard = boardData
      .slice(0, y * width + x)
      .concat(BoardItem.BLOCK)
      .concat(boardData.slice(y * width + x + 1))
    if (isValidBoard({ width, height, data: newBoard })) {
      boardData = newBoard
    }
    if (iterations++ > MAX_ITERATIONS) {
      console.error(
        `Could not find suitable board in ${MAX_ITERATIONS} iterations`
      )
      process.exit(0)
    }
  }

  return { width, height, data: boardData }
}

function isValidBoard(board: EmptyBoard) {
  const words = emptyBoardToEmptyPositions(board)
  return (
    // No 2-3 length words
    !words.some((w) => w.length >= 2 && w.length <= 3) &&
    // Limit number of blocks attached directly to sides
    words.filter((w) => w.position.x === 0 || w.position.y === 0).length >
      board.width + board.height - 6 &&
    // No ending corridors nor islands
    !words.some(
      (narrow) =>
        narrow.length === 1 &&
        board.data[
          narrow.position.y * board.width + narrow.position.x + board.width + 1
        ] === BoardItem.BLOCK
    )
  )
}

function emptyBoardToEmptyPositions(board: EmptyBoard): EmptyPosition[] {
  const positions: EmptyPosition[] = []
  // Vertical sweep
  for (let x = 1; x < board.width; x++) {
    let curr: EmptyPosition = {
      position: { x, y: 0 },
      direction: "vertical",
      length: 0
    }
    for (let y = 1; y < board.width; y++) {
      if (board.data[y * board.width + x] === BoardItem.EMPTY) {
        curr.length++
      } else {
        if (curr.length > 0) positions.push(curr)
        curr = { position: { x, y: y }, direction: "vertical", length: 0 }
      }
    }
    if (curr.length > 0) positions.push(curr)
  }

  // Horizontal sweep
  for (let y = 1; y < board.width; y++) {
    let curr: EmptyPosition = {
      position: { y, x: 0 },
      direction: "horizontal",
      length: 0
    }
    for (let x = 1; x < board.width; x++) {
      if (board.data[y * board.width + x] === BoardItem.EMPTY) {
        curr.length++
      } else {
        if (curr.length > 0) positions.push(curr)
        curr = { position: { x, y: y }, direction: "horizontal", length: 0 }
      }
    }
    if (curr.length > 0) positions.push(curr)
  }

  return positions
}

export type EmptyBoardPositions = {
  width: number
  height: number
  data: EmptyPosition[]
}

export function createEmptyBoard(
  width: number,
  height: number,
  numBlocks: number
): EmptyBoardPositions {
  const board = createFilledBoard(width, height, numBlocks)
  return {
    width,
    height,
    data: emptyBoardToEmptyPositions(board)
  }
}
