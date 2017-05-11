import { exec } from 'utils'

import { Parsed, NodeText } from 'models'

const execText = exec(/^[\s\S]+?(?=[\\<![_*`~]|https?:\/\/| *\n|$)/)

const captureText = (source: string): Parsed<NodeText> | null => {
  const [capture = ''] = execText(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'text',
      value: capture
    },
    newSource: source.substring(capture.length)
  }
}

export { captureText }
