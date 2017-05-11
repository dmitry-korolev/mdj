import { exec } from 'utils'

import { NodeText, Parsed } from 'models'

const execEscape = exec(/^\\([\\`*{}[\]()#+\-.!_>~|])/)
const captureEscape = (source: string): Parsed<NodeText> | null => {
  if (source[0] !== '\\') {
      return null
  }

  const [capture = ''] = execEscape(source)

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

export { captureEscape }
