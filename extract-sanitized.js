const wordnet = require("./lib/wordnet/wordnet")
const { promisify } = require("util")
const list = promisify(wordnet.list.bind(wordnet))
const lookup = promisify(wordnet.lookup.bind(wordnet))
const fs = require("fs/promises")

async function run() {
  const all = await list()
  const res = (
    await Promise.all(
      all
        .filter((word) => /^[aefhijklmnoprstuvyöäå]{4,6}$/.test(word))
        .map(async (word) =>
          (await lookup(word))
            .filter(
              ({
                meta: {
                  synsetType,
                  words: [{ word: firstWord }]
                }
              }) =>
                firstWord[0].toUpperCase() !== firstWord[0] &&
                synsetType !== "adjective satellite"
            )
            .map((data) => ({ word, ...data }))
        )
    )
  ).flat()
  await fs.writeFile(
    "words_sanitized.json",
    JSON.stringify([...new Set(res.map(({ word }) => word))], null, 2)
  )
}

run()
