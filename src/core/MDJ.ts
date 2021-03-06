import {
  captureBlockquote,
  captureCodeBlock,
  captureHeading,
  captureHR,
  captureHTML,
  captureList,
  captureNewLine,
  captureParagraph,
  captureTable
} from 'blockParsers'
import { clearSource } from 'utils'

import {
  captureCode,
  captureEm,
  captureEscape,
  captureInlineHTML,
  captureLineBreak,
  captureLinks,
  captureStrikethrough,
  captureStrong,
  captureText
} from 'inlineParsers'

import { IMDJOptions, INodeItem, IParsed, IParser, ITokenizer } from 'models'

type IParsersList = Array<{ parser: IParser, priority: number }>

const defaultOptions: IMDJOptions = {
  html: false
}

const MDJ = (_options?: IMDJOptions) => {
  const options = Object.assign({}, defaultOptions, _options)
  const parsers: {
    block: IParsersList
    inline: IParsersList
  } = {
    block: [
      { parser: captureNewLine, priority: 1000 },
      { parser: captureHeading, priority: 900 },
      { parser: captureHR, priority: 800 },
      { parser: captureBlockquote, priority: 700 },
      { parser: captureList, priority: 600 },
      { parser: captureTable, priority: 500 },
      { parser: captureCodeBlock, priority: 400 },
      { parser: captureParagraph, priority: 0 }
    ],
    inline: [
      { parser: captureEscape, priority: 1000 },
      { parser: captureCode, priority: 900 },
      { parser: captureStrong, priority: 800 },
      { parser: captureEm, priority: 700 },
      { parser: captureStrikethrough, priority: 600 },
      { parser: captureLineBreak, priority: 500 },
      { parser: captureLinks, priority: 400 },
      { parser: captureText, priority: 0 }
    ]
  }

  if (options.html) {
    addParser('block', captureHTML, 200)
    addParser('inline', captureInlineHTML, 200)
  }

  const blockLexer: ITokenizer = lexer('block')
  const inlineLexer: ITokenizer = lexer('inline')

  function addParser (type: 'block' | 'inline', parser: IParser, priority: number) {
    parsers[type].push({ parser, priority })
    parsers[type] = parsers[type].sort((a, b) => b.priority - a.priority)
  }

  function pinchToken (type: 'block' | 'inline', source: string): IParsed<INodeItem> | null {
    const l = parsers[type].length
    let token
    let newSource = ''

    for (let i = 0; i < l; i += 1) {
      const parser = parsers[type][i].parser
      const parsed = type === 'block' ?
        parser(source, blockLexer, inlineLexer) :
        parser(source, inlineLexer)

      if (parsed) {
        newSource = parsed.newSource
        token = parsed.token
        break
      }
    }

    if (!token) {
      return null
    }

    return {
      token,
      newSource
    }
  }

  function lexer (type: 'block' | 'inline') {
    return (source: string): INodeItem[] => {
      const tokens: INodeItem[] = []

      while (source.length > 0) {
        const { token = null, newSource = '' } = pinchToken(type, source) || {}

        if (source === newSource || !token) {
          throw new Error('Infinite loop on byte: ' + source.charCodeAt(0))
        }

        tokens.push(token)
        source = newSource
      }

      return tokens
    }
  }

  function prepareSource (source: string) {
    return clearSource(source)
  }

  const parser = {
    parse: function parse (source: string) {
      return blockLexer(prepareSource(source))
    },
    useInlineParser: function useInlineParser (parserFunc: IParser, priority: number) {
      addParser('inline', parserFunc, priority)
      return parser
    },
    useBlockParser: function useBlockParser (parserFunc: IParser, priority: number) {
      addParser('block', parserFunc, priority)
      return parser
    }
  }

  return parser
}

export { MDJ }
