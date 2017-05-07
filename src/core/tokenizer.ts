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

import { NodeItem, Parser, NodeBlockquote, Parsed } from 'models'

const parsers: Parser[] = [
  captureNewLine, // Should be first
  captureHeading,
  captureHR,
  captureBlockquote,
  captureCodeBlock,
  captureTable,
  captureParagraph // Should be last
]

const isBlockquoteToken = <(result: NodeItem) => result is NodeBlockquote>(result => result.type === 'blockquote')

const pinchToken = (source: string, isTop: boolean, isBlockquote: boolean): Parsed<NodeItem> | null => {
  let token
  let newSource = ''

  for (let i = 0; i < parsers.length; i += 1) {
    const parser = parsers[i]
    const parsed = parser(source, isTop, isBlockquote)

    if (!parsed) {
      continue
    }

    newSource = parsed.newSource

    if (parsed.inner && isBlockquoteToken(parsed.token)) {
      parsed.token.children = tokenize(parsed.inner, isTop, true)
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

const tokenize = (input: string, isTop: boolean, isBlockquote: boolean): NodeItem[] => {
  const tokens: NodeItem[] = []
  let source = clearSource(input)

  while (source.length > 0) {
    const { token = null, newSource = '' } = pinchToken(source, isTop, isBlockquote) || {}

    if (!token) {
      throw new Error('Infinite loop on byte: ' + source.charCodeAt(0))
    }

    tokens.push(token)
    source = newSource
  }

  return tokens
}

const lex = (input: string) => tokenize(clearSource(input), true, false)

export { lex }
