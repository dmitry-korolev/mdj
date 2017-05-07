import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeSpace } from 'models'

const execNewLine = exec(blockRules.newline)
const captureNewLine = (source: string): Parsed<NodeSpace> | null => {
  const [capture = ''] = execNewLine(source)

  if (!capture) {
    return null
  }

  return {
    token: { type: 'space' },
    newSource: source.substring(capture.length)
  }
}

export { captureNewLine }
