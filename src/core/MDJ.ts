import { clearSource } from 'utils'
import {
  captureNewLine,
  captureCodeBlock,
  captureHeading,
  captureHR,
  captureBlockquote,
  captureTable,
  captureParagraph,
  captureList
} from 'parsers'

import { NodeItem, Parsed, Parser } from 'models'

class MDJ {
  private blockParsers: { parser: Parser, priority: number }[] = []

  constructor() {
    this
      .useBlockParser(captureNewLine, 1000)
      .useBlockParser(captureHeading, 900)
      .useBlockParser(captureHR, 800)
      .useBlockParser(captureBlockquote, 700)
      .useBlockParser(captureCodeBlock, 600)
      .useBlockParser(captureTable, 500)
      .useBlockParser(captureList, 400)
      .useBlockParser(captureParagraph, 0)

    this.tokenize = this.tokenize.bind(this)
    this.pinchBlockToken = this.pinchBlockToken.bind(this)
  }

  private pinchBlockToken(source: string): Parsed<NodeItem> | null {
    let token
    let newSource = ''

    for (let i = 0; i < this.blockParsers.length; i += 1) {
      const parser = this.blockParsers[i].parser
      const parsed = parser(source, this.tokenize)

      if (!parsed) {
        continue
      }

      newSource = parsed.newSource
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

  private tokenize(input: string): NodeItem[]  {
    const tokens: NodeItem[] = []
    let source = clearSource(input)

    while (source.length > 0) {
      const { token = null, newSource = '' } = this.pinchBlockToken(source) || {}

      if (source === newSource || !token) {
        throw new Error('Infinite loop on byte: ' + source.charCodeAt(0))
      }

      tokens.push(token)
      source = newSource
    }

    return tokens
  }

  public useBlockParser(parser: Parser, priority: number = 500) {
    this.blockParsers.push({ parser, priority })
    this.blockParsers = this.blockParsers.sort((a, b) => b.priority - a.priority)
    return this
  }

  public parse(source: string) {
    return this.tokenize(source)
  }
}

export { MDJ }
