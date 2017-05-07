import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeBlockquote } from 'models'

const execBlockquote = exec(blockRules.blockquote)
const captureBlockquote = (source: string): Parsed<NodeBlockquote> | null => {
  const [capture = ''] = execBlockquote(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'blockquote',
      children: []
    },
    inner: capture.replace(/^ *> ?/gm, ''),
    newSource: source.substring(capture.length)
  }
}

export { captureBlockquote }
