import util from "util"

const wordnet = require("./lib/wordnet/wordnet")
const listAll: () => Promise<string[]> = util.promisify(wordnet.list)
const wordToFind = process.argv[2]

listAll().then((words) =>
  console.log(
    `${wordToFind} was ${words.indexOf(wordToFind) > -1 ? "" : "not "}found`
  )
)
