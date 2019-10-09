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
  y: number,
  _data: string[]
}

const uniq = <T>(input: T[]) => [...new Set(input)]
const intersectOrInsert = (input: string, current: string) => current === EMPTY ? uniq(input.split('')).join('') : uniq(input.split('')).filter(char => current.indexOf(char) > -1).join('')

const assignArr = <T>(value: T, index: number, arr: T[]): T[] =>
  arr.slice(0, index).concat(value).concat(arr.slice(index + 1))

const get = (x: number,y: number, board: Board) => board._data[y * board.width + x]
const set = (x: number,y: number, value: string, board: Board) => ({
  ...board,
  _data: assignArr(intersectOrInsert(value, get(x, y, board)), y * board.width + x, board._data)
})

export const getWords = (board: Board) => {
  const allWords = Array<Word>()
  for(let x = 0; x < board.width; x++) {
    let _data = []
    for (let y = 0; y < board.height; y++) {
      _data.push(get(x, y, board))
    }
    allWords.push({ word: _data.join(''), x, y: 0, direction: 'vertical', _data })
  }
  for (let y = 0; y < board.height; y++) {
    let _data = []
    for(let x = 0; x < board.width; x++) {
      _data.push(get(x, y, board))
    }
    allWords.push({ word: _data.join(''), y, x: 0, direction: 'horizontal', _data })
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

export const setPossibleWords = (words: string[], x: number, y: number, direction: Direction, board: Board) => {
  for (let index = 0; index < (words[0] ? words[0].length : 0); index++) {
    board = set(
      direction === 'horizontal' ? x + index : x,
      direction === 'vertical' ? y + index : y,
      words.map(w => w.charAt(index)).join(''),
      board
    )
  }
  return board
}


export const createBoard = (width: number, height: number): Board => ({
  width,
  height,
  _data: Array<string>(width*height).fill(EMPTY)
})

export const getMatcher = (word: Word) => new RegExp('^' + word._data.map(chars => chars === EMPTY ? '.' : `[${chars}]`).join('') + '$')