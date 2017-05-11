import { exec, replace } from 'utils'

import { Parsed, NodeParagraph, Tokenizer } from 'models'

const execParagraph = exec(/^((?:[^\n]+\n?)+)\n*/)
const removeLastLineBreak = replace(/\n$/, ' ')

const captureParagraph = (source: string, _: any, inlineLexer: Tokenizer): Parsed<NodeParagraph> | null => {
  const [capture = '', rawValue = ''] = execParagraph(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'paragraph',
      children: inlineLexer(removeLastLineBreak(rawValue))
    },
    newSource: source.substring(capture.length)
  }
}

export { captureParagraph }
