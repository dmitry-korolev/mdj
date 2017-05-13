import { exec } from 'utils'

import { Parsed, NodeSpace } from 'models'

const execNewLine = exec(/^\n+/)

const captureNewLine = (source: string): Parsed<NodeSpace> | null => {
  const result = execNewLine(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  return {
    token: { type: 'space' },
    newSource: source.substring(capture.length)
  }
}

export { captureNewLine }
