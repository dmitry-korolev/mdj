import { exec } from 'utils'

import { NodeText, Parsed } from 'models'

const execEscape = exec(/^\\([\\`*{}[\]()#+\-.!_>~|])/)
const captureEscape = (source: string): Parsed<NodeText> | null => {
  if (source[0] !== '\\') {
      return null
  }

  const result = execEscape(source)

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

export { captureEscape }
