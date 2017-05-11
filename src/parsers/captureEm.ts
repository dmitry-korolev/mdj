import { exec } from 'utils'

import { NodeEm, Parsed, Tokenizer } from 'models'

const execEm = exec(/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/)
const captureEm = (source: string, inlineLexer: Tokenizer): Parsed<NodeEm> | null => {
  if (source[0] !== '_' && source[0] !== '*') {
      return null
  }

  const [capture = '', a = '', b = ''] = execEm(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'em',
      children: inlineLexer(b || a)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureEm }
