import { clearSource } from 'utils'
import {
  captureBlockquote,
  captureCodeBlock,
  captureHeading,
  captureHR,
  captureList,
  captureNewLine,
  captureParagraph,
  captureTable,

  captureCode,
  captureEm,
  captureEscape,
  captureLineBreak,
  captureLinks,
  captureStrikethrough,
  captureStrong,
  captureText
} from 'parsers'

import { NodeItem, Parsed, Parser, Tokenizer } from 'models'

type ParsersList = { parser: Parser, priority: number }[]

const MDJ = () => {
  const parsers: {
    block: ParsersList
    inline: ParsersList
  } = {
    block: [
      { parser: captureNewLine, priority: 1000 },
      { parser: captureHeading, priority: 900 },
      { parser: captureHR, priority: 800 },
      { parser: captureBlockquote, priority: 700 },
      { parser: captureCodeBlock, priority: 600 },
      { parser: captureTable, priority: 500 },
      { parser: captureList, priority: 400 },
      { parser: captureParagraph, priority: 0 }
    ],
    inline: [
      { parser: captureEscape, priority: 1000 },
      { parser: captureCode, priority: 900 },
      { parser: captureStrong, priority: 800 },
      { parser: captureEm, priority: 700 },
      { parser: captureStrikethrough, priority: 600 },
      { parser: captureLinks, priority: 500 },
      { parser: captureLineBreak, priority: 400 },
      { parser: captureText, priority: 0 }
    ]
  }

  const blockLexer: Tokenizer = lexer('block')
  const inlineLexer: Tokenizer = lexer('inline')

  function addParser (type: 'block' | 'inline', parser: Parser, priority: number) {
    parsers[type].push({parser, priority})
    parsers[type] = parsers[type].sort((a, b) => b.priority - a.priority)
  }

  function pinchToken (type: 'block' | 'inline', source: string): Parsed<NodeItem> | null {
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
    return (input: string): NodeItem[] => {
      const tokens: NodeItem[] = []
      let source = clearSource(input)

      while (source.length > 0) {
        const {token = null, newSource = ''} = pinchToken(type, source) || {}

        if (source === newSource || !token) {
          throw new Error('Infinite loop on byte: ' + source.charCodeAt(0))
        }

        tokens.push(token)
        source = newSource
      }

      return tokens
    }
  }

  return {
    parse: function parse(source: string) {
      return blockLexer(source)
    },
    useInlineParser: function useInlineParser(parser: Parser, priority: number) {
      addParser('inline', parser, priority)
      return this
    },
    useBlockParser: function useBlockParser(parser: Parser, priority: number) {
      addParser('block', parser, priority)
      return this
    }
  }
}

export { MDJ }
