import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeHR } from 'models'

const execHR = exec(blockRules.hr)
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
