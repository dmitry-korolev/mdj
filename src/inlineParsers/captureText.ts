import { exec } from 'utils'

import { Parsed, NodeText } from 'models'

const execText = exec(/^[\s\S]+?(?=[\\<![_*`~]|https?:\/\/| *\n|$)/)

const captureText = (source: string): Parsed<NodeText> | null => {
  const result = execText(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  return {
    token: {
      type: 'text',
      value: capture
    },
    newSource: source.substring(capture.length)
  }
}

export { captureText }
