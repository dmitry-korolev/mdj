import { clearSource } from 'utils'
import {
  captureNewLine,
  captureCodeBlock,
  captureHeading,
  captureHR,
  captureBlockquote,
  captureTable,
  captureParagraph
} from 'parsers'

import { NodeBlockquote, NodeItem, Parsed, Parser } from 'models'

const isBlockquoteToken = <(result: NodeItem) => result is NodeBlockquote>(result => result.type === 'blockquote')
class MDJ {
  private blockParsers: { parser: Parser, priority: number }[] = []

  constructor() {
    this.useBlockParser(captureNewLine, 1000)
    this.useBlockParser(captureHeading, 900)
    this.useBlockParser(captureHR, 800)
    this.useBlockParser(captureBlockquote, 700)
    this.useBlockParser(captureCodeBlock, 600)
    this.useBlockParser(captureTable, 500)
    this.useBlockParser(captureParagraph, 0)
  }

  private pinchBlockToken(source: string, isTop: boolean, isBlockquote: boolean): Parsed<NodeItem> | null {
    let token
    let newSource = ''

    for (let i = 0; i < this.blockParsers.length; i += 1) {
      const parser = this.blockParsers[i].parser
      const parsed = parser(source, isTop, isBlockquote)

      if (!parsed) {
        continue
      }

      newSource = parsed.newSource

      if (parsed.inner && isBlockquoteToken(parsed.token)) {
        parsed.token.children = this.tokenize(parsed.inner, isTop, true)
      }

      token = parsed.token
      break
    }

    if (!token) {
      return null
    }

    return {
      token,
      newSource
    }
  }

  private tokenize(input: string, isTop: boolean, isBlockquote: boolean): NodeItem[]  {
    const tokens: NodeItem[] = []
    let source = clearSource(input)

    while (source.length > 0) {
      const { token = null, newSource = '' } = this.pinchBlockToken(source, isTop, isBlockquote) || {}

      if (!token) {
        throw new Error('Infinite loop on byte: ' + source.charCodeAt(0))
      }

      tokens.push(token)
      source = newSource
    }

    return tokens
  }

  public useBlockParser(parser: Parser, priority: number = 500) {
    this.blockParsers.push({ parser, priority })
  }

  public parse(source: string) {
    this.blockParsers = this.blockParsers.sort((a, b) => b.priority - a.priority)
    return this.tokenize(source, true, false)
  }
}

export { MDJ }
