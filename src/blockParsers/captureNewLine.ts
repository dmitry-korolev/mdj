import { exec } from 'utils'

import { INodeSpace, IParsed } from 'models'

const execNewLine = exec(/^\n+/)

const captureNewLine = (source: string): IParsed<INodeSpace> | null => {
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
