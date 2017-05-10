import { exec, replace } from 'utils'

import { Parsed, NodeBlockquote, Tokenize } from 'models'

const execBlockquote = exec(/^( *>[^\n]+(\n(?! *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))[^\n]+)*\n*)+/)
const clearBlockquote = replace(/^ *> ?/gm, '')

const captureBlockquote = (source: string, tokenize: Tokenize): Parsed<NodeBlockquote> | null => {
  const [capture = ''] = execBlockquote(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'blockquote',
      children: tokenize(clearBlockquote(capture))
    },
    newSource: source.substring(capture.length)
  }
}

export { captureBlockquote }
