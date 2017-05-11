import { exec } from 'utils'

import { NodeStrong, Parsed, Tokenizer } from 'models'

const execStrong = exec(/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/)
const captureStrong = (source: string, inlineLexer: Tokenizer): Parsed<NodeStrong> | null => {
  if (source[0] !== '_' && source[0] !== '*') {
      return null
  }

  const [capture = '', a = '', b = ''] = execStrong(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'strong',
      children: inlineLexer(b || a)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureStrong }
