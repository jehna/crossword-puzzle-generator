import util from 'util'
import { Board, getWords, getMatcher, setPossibleWords } from "./board"

const wordnet = require('./lib/wordnet/wordnet')
const listAll: () => Promise<string[]> = util.promisify(wordnet.list)
const VALID_WORD = /^[a-zöäå]{3,}$/
const allWordsWith4Letters = listAll().then(words => words.filter(w => VALID_WORD.test(w)))

const deepEqual = (in1: any, in2: any) => JSON.stringify(in1) === JSON.stringify(in2)

export const iterate = async (board: Board) => {
  let lastBoard = board
  let max = 100

  while(max--) {
    const words = getWords(board)

    for (const word of words) {
      const matcher = getMatcher(word)
      const possibleWords = (await allWordsWith4Letters).filter(w => matcher.test(w))
      board = setPossibleWords(possibleWords, word.x, word.y, word.direction, board)
    }

    // jiggle until does not move
    if (deepEqual(lastBoard, board)) break
    lastBoard = board
  }

  return board
}

const removeRandomChar = (word: string) => {
  const randomIndex = Math.floor(Math.random() * word.length)
  return word.slice(0, randomIndex) + word.slice(randomIndex + 1)
}

export const experiment = async (board: Board) => {

  let max = 200
  let currBoard = await iterate(board)
  while(max-- && !isSolved(currBoard)) {

    const minUnmatchedLength = Math.min(...currBoard._data.map(w => w.length).filter(l => l > 1))
    const firstMinIndex = currBoard._data.findIndex(s => s.length === minUnmatchedLength)
    const x = firstMinIndex % currBoard.width
    const y = Math.floor(firstMinIndex / currBoard.width)
    const minWithRandomRemoved = removeRandomChar(currBoard._data[firstMinIndex])
    const newBoard = await iterate(setPossibleWords(minWithRandomRemoved.split(''), x, y, 'horizontal', currBoard))

    if (!isImpossible(newBoard)) currBoard = newBoard
  }

  return currBoard
}

const isSolved = (board: Board) => Math.max(...board._data.map(w => w.length)) === 1
const isImpossible = (board: Board) => Math.min(...board._data.map(w => w.length)) === 0