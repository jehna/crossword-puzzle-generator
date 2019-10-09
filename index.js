const Board = require('./board')

const board = new Board(4,4)
board._set(1,0,'f')
board._set(1,1,'o')
board._set(1,2,'o')
board._set(1,3,'b')

console.log(board.getWords())