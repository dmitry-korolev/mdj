## MDJ - Markdown (GFM) to JSON compiler
Work in progress
This is a fork of [marked](https://github.com/chjj/marked/).

### Usage
```
import MDJ from 'mdj'
import source from 'source.md'

const mdj = MDJ()
const parsedSource = mdj.parse(source)
```

### Adding new parser rules
Parsers are devided into two parts:
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

Before parsing all parser rules are sorted by priority. You may check priorities of default parsers in the source (`./src/core/MDJ.ts`)

Each parser receives one parameter - `source`, which is, basically, non-parsed part of the initial source. Parser should return null, if it did nothing, or an object, containing a new token, which will be added to JSON and a new source. See examples in `./src/parsers`.

### Limitations
Not supported: 
1. Reference links 