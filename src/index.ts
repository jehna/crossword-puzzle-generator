import { createEmptyBoard } from "./board"
import { solve } from "./solver"
import { printHorizontal, printVertical, printEmptyBoard } from "./debug"
import assert from "assert"

const board = createEmptyBoard(6, 6, 0)
console.log(printEmptyBoard(board) + "\n")

const solved = solve(board)

const pretty = printHorizontal(solved)
assert.strictEqual(pretty, printVertical(solved))

console.log(pretty)
