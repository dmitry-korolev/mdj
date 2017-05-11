import { exec } from 'utils'

import { Parsed, NodeHeading, Tokenizer } from 'models'

const execHeading = exec(/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/)
const execLHeading = exec(/^([^\n]+)\n *([=-]){2,} *(?:\n+|$)/)

const captureNormalHeading = (source: string, inlineLexer: Tokenizer): Parsed<NodeHeading> | null => {
  if (source[0] !== '#') {
    return null
  }

  const [capture = '', level = [], rawValue = ''] = execHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level.length,
      children: inlineLexer(rawValue)
    },
    newSource: source.substring(capture.length)
  }
}

const captureLHeading = (source: string, inlineLexer: Tokenizer): Parsed<NodeHeading> | null => {
  const [capture = '', rawValue = '', level = ''] = execLHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level === '=' ? 1 : 2,
      children: inlineLexer(rawValue)
    },
    newSource: source.substring(capture.length)
  }
}

const captureHeading = (source: string, _: any, inlineLexer: Tokenizer): Parsed<NodeHeading> | null =>
  captureNormalHeading(source, inlineLexer) || captureLHeading(source, inlineLexer)


export { captureHeading }
