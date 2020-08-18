# CrossNet

> Crossword puzzle generator that uses WordNet data

CrossNet is a tool that automagically generates crossword puzzles, and takes
into account any fixed words that you want to have in the puzzle. Runs with
WordNet data, so you can substitute the data with any language's own WordNet
files to get localized results. Uses
[FinnWordNet](https://www.kielipankki.fi/corpora/finnwordnet/) by default.

This project is tightly coupled to produce levels for this project:
https://github.com/jehna/crossword-puzzle-game

**Note:** This project is still under initial development

## Getting started

To run the project, first install dependencies:

```
yarn
yarn init
```

This installs all needed dependencies (mostly just TypeScript) with Yarn package
manager, downloads the Finnish WordNet data, and sanitizes the wordnet for best
words as a cached JSON file.

After the installation has succeeded, you can run the generator:

```
yarn start
```

This script runs the `index.ts` file with `ts-node` and outputs a filled puzzle.

## License

The code in this repository is licensed under MIT license.

## Other licenses

[FinnWordNet](https://www.kielipankki.fi/corpora/finnwordnet/) data is licensed
by [Creative Commons Attribution (CC-BY) 3.0
license](http://creativecommons.org/licenses/by/3.0/)

[WordNet.js](https://github.com/words/wordnet) is licensed by MIT license.
