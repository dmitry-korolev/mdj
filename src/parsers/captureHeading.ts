import { exec } from 'utils'

import { Parsed, NodeHeading, Tokenizer } from 'models'

const execHeading = exec(/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/)
const execLHeading = exec(/^([^\n]+)\n *([=-]){2,} *(?:\n+|$)/)
const getLevel = (input: string): number => {
  if (input[0] === '#') {
    return input.length
  }

  return input === '=' ? 1 : 2
}

const captureHeading = (source: string, _: any, inlineLexer: Tokenizer): Parsed<NodeHeading> | null => {
  const result = (source[0] !== '#' && execHeading(source)) || execLHeading(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const level = result[1]
  const rawValue = result[2]

  return {
    token: {
      type: 'heading',
      level: getLevel(level),
      children: inlineLexer(rawValue)
    },
    newSource: source.substring(capture.length)
  }
}


export { captureHeading }
