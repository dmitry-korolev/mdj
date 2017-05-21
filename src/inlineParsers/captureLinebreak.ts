import { exec } from 'utils'

import { INodeLineBreak, IParsed } from 'models'

const execLineBreak = exec(/^ *\n(?!\s*$)/)
const captureLineBreak = (source: string): IParsed<INodeLineBreak> | null => {
  const result = execLineBreak(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  return {
    token: {
      type: 'br'
    },
    newSource: source.substring(capture.length)
  }
}

export { captureLineBreak }
