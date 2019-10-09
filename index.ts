import { createBoard, getWords, setWord } from './board'

const board = setWord('foo', 1, 0, 'vertical', createBoard(4,4))

console.log(getWords(board))