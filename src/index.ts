import { createEmptyBoard } from "./board"
import { solve } from "./solver"
import { printHorizontal, printVertical, toExportable } from "./debug"
import assert from "assert"

const board = createEmptyBoard(6, 7, 0)

const solved = solve(board)

const pretty = printHorizontal(solved)
assert.strictEqual(pretty, printVertical(solved))

console.log(pretty)

const exportable = toExportable(solved)
console.log(JSON.stringify(exportable))
