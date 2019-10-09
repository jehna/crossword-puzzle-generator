/**
 * Copyright (c) 2013 Dariusz Dziuk
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * File reader interface
 *
 * @author Dariusz Dziuk <me@dariuszdziuk.com>
 */

var fs = require('fs');
var readline = require('readline');
var Stream = require('stream');

/**
 * Public interface
 *
 * @type {Object}
 */

module.exports = {

  /**
   * Reads a text file line by line
   *
   * @param {String} file Name of the file.
   * @param {Function} onLine Callback per line.
   * @param {Function} onClose On file closed.
   */

  read: function(file, onLine, onClose) {

    var inputStream = fs.createReadStream(file);
    var outputStream = new Stream();
    outputStream.readable = true;
    outputStream.writeable = true;

    var rl = readline.createInterface({
      input: inputStream,
      output: outputStream,
      terminal: false
    });

    rl.on('line', onLine);
    rl.on('close', onClose)

  }

};