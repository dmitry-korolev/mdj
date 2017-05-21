import { exec } from 'utils'

import { Parsed, NodeHeading, Tokenizer } from 'models'

const execHeading = exec(/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/)
const execLHeading = exec(/^([^\n]+)\n *([=-]){2,} *(?:\n+|$)/)
const getLevel = (input: string): number => {
  if (input[0] === '#') {
    return input.length
  }

  return input[0] === '=' ? 1 : 2
}

const captureHeading = (source: string, _: any, inlineLexer: Tokenizer): Parsed<NodeHeading> | null => {
  const isNormal = source[0] === '#'
  const result = (isNormal && execHeading(source)) || execLHeading(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const level = isNormal ? result[1] : result[2]
  const rawValue = isNormal ? result[2] : result[1]

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
