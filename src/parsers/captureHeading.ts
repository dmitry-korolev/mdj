import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeHeading } from 'models'

const execHeading = exec(blockRules.heading)
const captureNormalHeading = (source: string): Parsed<NodeHeading> | null => {
  const [capture = '', level = [], text = ''] = execHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level.length,
      value: text
    },
    newSource: source.substring(capture.length)
  }
}

const execLHeading = exec(blockRules.lheading)
const captureLHeading = (source: string): Parsed<NodeHeading> | null => {
  const [capture = '', value = '', level = ''] = execLHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level === '=' ? 1 : 2,
      value
    },
    newSource: source.substring(capture.length)
  }
}

const captureHeading = (source: string): Parsed<NodeHeading> | null =>
  captureNormalHeading(source) || captureLHeading(source)


export { captureHeading }
