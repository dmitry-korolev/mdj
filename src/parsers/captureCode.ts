import { exec } from 'utils'

import { NodeCode, Parsed } from 'models'

const execCode = exec(/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/)
const captureCode = (source: string): Parsed<NodeCode> | null => {
  if (source[0] !== '`') {
      return null
  }

  const [capture = '', , code = ''] = execCode(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'code',
      value: code
    },
    newSource: source.substring(capture.length)
  }
}

export { captureCode }
