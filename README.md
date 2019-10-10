# CrossNet

> Crossword puzzle generator that uses WordNet data

CrossNet is a tool that automagically generates crossword puzzles, and takes into account any fixed words that you want to have in the puzzle. Runs with WordNet data, so you can substitute the data with any language's own WordNet files to get localized results. Uses Finnish WprdNet by default.

**Note:** This project is still under initial development

## Getting started

To run the project, first install dependencies:

```
yarn
```

This installs all needed dependencies (mostly just TypeScript) with Yarn package manager.

After the installation has succeeded, you can run the generator:

```
yarn start
```

This script runs the `index.ts` file with `ts-node` and outputs a filled puzzle.

## License

The code in this repository is licensed under MIT license
