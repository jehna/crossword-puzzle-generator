const EMPTY = ' '

module.exports = class Board {
  width
  height
  _data

  constructor(width, height) {
    this.width = width
    this.height = height
    this._data = new Array(width * height).fill(EMPTY)
  }

  _get(x, y) {
    return this._data[y * this.width + x]
  }

  _set(x, y, val) {
    this._data[y * this.width + x] = val
  }

  getWords() {
    const allWords = []
    for(let x = 0; x < this.width; x++) {
      let word = ''
      for (let y = 0; y < this.height; y++) {
        word += this._get(x,y)
      }
      allWords.push({ word, x, y: 0, direction: 'vertical' })
    }
    for (let y = 0; y < this.height; y++) {
      let word = ''
      for(let x = 0; x < this.width; x++) {
        word += this._get(x,y)
      }
      allWords.push({ word, y, x: 0, direction: 'horizontal' })
    }
    return allWords
  }
}