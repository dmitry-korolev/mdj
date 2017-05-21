import { exec } from 'utils'

import { INodeText, IParsed } from 'models'

const execText = exec(/^[\s\S]+?(?=[\\<![_*`~]|https?:\/\/| *\n|$)/)

const captureText = (source: string): IParsed<INodeText> | null => {
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
