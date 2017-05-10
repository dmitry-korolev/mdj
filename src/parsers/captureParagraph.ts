import { exec, replace } from 'utils'

import { Parsed, NodeParagraph } from 'models'

const execParagraph = exec(/^((?:[^\n]+\n?)+)\n*/)
const removeLastLineBreak = replace(/\n$/, ' ')

const captureParagraph = (source: string): Parsed<NodeParagraph> | null => {
  const [capture = '', rawValue = ''] = execParagraph(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'paragraph',
      rawValue: removeLastLineBreak(rawValue),
      children: []
    },
    newSource: source.substring(capture.length)
  }
}

export { captureParagraph }
