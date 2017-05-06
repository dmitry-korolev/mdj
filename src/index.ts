import { clearSource, last } from 'utils'
import { isBlockquote, isEmptyString, isHeading, isCodeBlock, isHR } from 'checkers'
import { parseHeader, parseSpace, parseCodeBlock, parseHR } from 'parsers'
import blockRules from 'rules/blockRules'

import { NodeItem, NodeParagraph } from 'models'

const isParagraphToken = <(result: NodeItem) => result is NodeParagraph>(result => result.type === 'paragraph')

const tokenize = (lines: string[]): NodeItem[] => {
  const tokens: NodeItem[] = []
  let currentLine = 0

  while (currentLine < lines.length) {
    let line = lines[currentLine]

    if (isEmptyString(line)) {
      const { token } = parseSpace()
      tokens.push(token)
      currentLine += 1
      continue
    }

    if (isHeading(line)) {
      const { token } = parseHeader(line)
      tokens.push(token)
      currentLine += 1
      continue
    }

    if (isCodeBlock(line)) {
      const { token, skip } = parseCodeBlock(lines, currentLine)
      tokens.push(token)
      currentLine += skip || 1
      continue
    }

    if (isHR(line)) {
      const { token } = parseHR()
      tokens.push(token)
      currentLine += 1
      continue
    }

    if (isBlockquote(line)) {
      const fullBlockquote = [line.replace(blockRules.blockquote, '')]
      currentLine += 1

      while (isBlockquote(lines[currentLine])) {
        fullBlockquote.push(lines[currentLine].replace(blockRules.blockquote, ''))
        currentLine += 1
      }

      tokens.push({
        type: 'blockquote',
        children: tokenize(fullBlockquote)
      })
      continue
    }

    if (tokens.length && isParagraphToken(last(tokens))) {
      const token = last(tokens)
      if (isParagraphToken(token)) {
        token.children.push({
          type: 'text',
          value: line
        })
      }

      currentLine += 1
      continue
    }

    tokens.push({
      type: 'paragraph',
      children: [{
        type: 'text',
        value: line
      }]
    })

    currentLine += 1
  }

  return tokens
}

const lex = (input: string) => tokenize(clearSource(input).split('\n'))

export { lex }
