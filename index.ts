import { createBoard, setWord, getWords, Board } from './board'
import { experiment } from './solver'

const prettyPrint = (board: Board) => {
  let result = ''
  for (let i = 0; i < board.height; i++) {
    result += board._data.slice(i * board.width, i * board.width + board.width).join('')
    result += '\n'
  }
  return result
}

async function run() {
  const board = setWord('sonja', 0, 1, 'horizontal', createBoard(5,5))
  const result = await experiment(board)
  console.log(prettyPrint(result))
}

run()