## MDJ - Markdown (GFM) to JSON compiler
[![npm](https://img.shields.io/npm/v/mdj.svg)](https://www.npmjs.com/package/mdj) [![Travis](https://img.shields.io/travis/dmitry-korolev/mdj.svg)](https://travis-ci.org/dmitry-korolev/mdj/) [![typescript](https://img.shields.io/badge/written_in-typescript-blue.svg)](https://www.typescriptlang.org/) [![standard](https://img.shields.io/badge/code_style-standard-yellow.svg)](https://standardjs.com/)

Because sometimes you **don't** need HTML.

### Why
I needed small, reasonably performant, extendable and reliable tool to convert Markdown ([GFM](https://guides.github.com/features/mastering-markdown/)) to JSON. Every small markdown parser, that I've found, couldn't generate JSON; every module, capable of generating JSON, is insanely bloated. Therefore I decided to make my own. MDJ is mostly based on [marked](https://github.com/chjj/marked/) with many improvements.

### Usage
```
import MDJ from 'mdj'
import source from 'source.md'

const mdj = MDJ()
const parsedSource = mdj.parse(source)

// OR
import { parse }  from 'mdj'
import source from 'source.md'

const parsedSource = parse(source) // Note that this is less performant.
```

MDJ constructor accepts an optional settings argument:
```
interface IMDJOptions {
  html?: boolean // enables HTML support, false by default
}
```

### Output
Parser returns an array of tokens. Each token contains at least one property - `type`, which can be `heading`, `paragraph`, `code` etc.

Other content of tokens may vary. For example tokens of types `text`, `code`, `codeblock` and `html` have a `value` property, which represents the raw content of that token.

```
const md = '`console.log("test")`'

parse(md) //
/*
 outputs
 [
   {
     type: 'paragraph',
     children: [
       {
         type: 'code',
         value: 'console.log("test")
       }
     ]
   }
 ]
*/
```

As you would have noticed, other tokens may have the `children` property, which will contain another array of tokens.

### Adding new parser rules
Parsers are divided into two parts:
1. Block parsers, e.g.: paragraph, lists, tables, block quotes etc.
2. Inline parsers, e.g.: links, checkboxes, images, etc.

To add new parser rule use corresponding instance method:

```
const blockParser = (source: string) => {/* */}
const inlineParser = (source: string) => {/* */}
const priority = 300

mdj.useBlockParser(blockParser, priority)
mdj.useInlineParser(inlineParser, priority)
```

Before starting the parsing process all rules are sorted by priority. You may check priorities of default parsers in the source (`./src/core/MDJ.ts`)

Each parser receives from one to three parameters - `source`, which is, basically, non-parsed part of the initial source, and one or two lexers (block-level and inline-level for block-level parsers and only inline-level lexer for inline-level parser). Passed lexers use the same MDJ instance and can be used to parse whatever needs to be parsed inside your parser.

Parser should return null, if it did nothing, or an object, containing a new token, which will be added to JSON and a new source. See examples in `./src/parsers`.

### Roadmap to 1.0.0:
* [ ] Add support for reference links and images
* [x] Add support for HTML
* [ ] Add support for checkbox lists
* [ ] Pass all tests

Performance:
* [ ] Add public benchmarks
* [x] Move to rollup
* [x] Try prepack.io - tried, no benefit

### License
MDJ is released under the [MIT license](LICENSE).