import { exec } from 'utils'

import { NodeEm, Parsed, Tokenizer } from 'models'

const execEm = exec(/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/)
const captureEm = (source: string, inlineLexer: Tokenizer): Parsed<NodeEm> | null => {
  if (source[0] !== '_' && source[0] !== '*') {
      return null
  }

  const result = execEm(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const a = result[1]
  const b = result[2]

  return {
    token: {
      type: 'em',
      children: inlineLexer(b || a)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureEm }
