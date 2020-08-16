import { createEmptyBoard } from "./board"
import { solve } from "./solver"
import { printHorizontal, printVertical } from "./debug"
import assert from "assert"

const board = createEmptyBoard(5, 5)

const solved = solve(board)

const pretty = printHorizontal(solved)
assert.strictEqual(pretty, printVertical(solved))

console.log(pretty)
