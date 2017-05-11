import { exec } from 'utils'

import { NodeStrikethrough, Parsed, Tokenizer } from 'models'

const execStrikethrough = exec(/^~~(?=\S)([\s\S]*?\S)~~/)
const captureStrikethrough = (source: string, inlineLexer: Tokenizer): Parsed<NodeStrikethrough> | null => {
  if (source[0] !== '~') {
      return null
  }

  const [capture = '', a = ''] = execStrikethrough(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'strikethrough',
      children: inlineLexer(a)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureStrikethrough }
