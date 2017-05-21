import { exec } from 'utils'

import { INodeHR, IParsed } from 'models'

const execHR = exec(/^ *(?:\*{3,}|-{3,}|_{3,}) *(?:\n+|$)/)

const captureHR = (source: string): IParsed<INodeHR> | null => {
  const result = execHR(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  return {
    token: { type: 'hr' },
    newSource: source.substring(capture.length)
  }
}

export { captureHR }
