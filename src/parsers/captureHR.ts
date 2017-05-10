import { exec } from 'utils'

import { Parsed, NodeHR } from 'models'

const execHR = exec(/^ *(?:\*{3,}|-{3,}|_{3,}) *(?:\n+|$)/)

const captureHR = (source: string): Parsed<NodeHR> | null => {
  const [capture = ''] = execHR(source)

  if (!capture) {
    return null
  }

  return {
    token: { type: 'hr' },
    newSource: source.substring(capture.length)
  }
}

export { captureHR }
