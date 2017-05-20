import { exec } from 'utils'

import { NodeLineBreak, Parsed } from 'models'

const execLineBreak = exec(/^ *\n(?!\s*$)/)
const captureLineBreak = (source: string): Parsed<NodeLineBreak> | null => {
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
