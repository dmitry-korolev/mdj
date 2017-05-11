import { exec } from 'utils'

import { NodeLineBreak, Parsed } from 'models'

const execLineBreak = exec(/^ *\n(?!\s*$)/)
const captureLineBreak = (source: string): Parsed<NodeLineBreak> | null => {
  const [capture = ''] = execLineBreak(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'br'
    },
    newSource: source.substring(capture.length)
  }
}

export { captureLineBreak }
