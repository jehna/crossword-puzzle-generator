export const EMPTY = ' '

export interface Board {
  width: number,
  height: number,
  _data: string[]
}

export type Direction = 'horizontal' | 'vertical'

export interface Word {
  direction: Direction,
  word: string,
  x: number,
  y: number
}

const assignArr = <T>(value: T, index: number, arr: T[]): T[] =>
  arr.slice(0, index).concat(value).concat(arr.slice(index + 1))

const get = (x: number,y: number, board: Board) => board._data[y * board.width + x]
const set = (x: number,y: number, value: string, board: Board) => ({
  ...board,
  _data: assignArr(value.charAt(0), y * board.width + x, board._data)
})

export const getWords = (board: Board) => {
  const allWords = Array<Word>()
  for(let x = 0; x < board.width; x++) {
    let word = ''
    for (let y = 0; y < board.height; y++) {
      word += get(x, y, board)
    }
    allWords.push({ word, x, y: 0, direction: 'vertical' })
  }
  for (let y = 0; y < board.height; y++) {
    let word = ''
    for(let x = 0; x < board.width; x++) {
      word += get(x, y, board)
    }
    allWords.push({ word, y, x: 0, direction: 'horizontal' })
  }
  return allWords
}

export const setWord = (word: string, x: number, y: number, direction: Direction, board: Board) =>
  word.split('')
    .reduce((board, char, index) => set(
      direction === 'horizontal' ? x + index : x,
      direction === 'vertical' ? y + index : y,
      char,
      board
    ), board)

export const createBoard = (width: number, height: number): Board => ({
  width,
  height,
  _data: Array<string>(width*height).fill(EMPTY)
})