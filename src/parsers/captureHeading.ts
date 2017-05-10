import { exec } from 'utils'

import { Parsed, NodeHeading } from 'models'

const execHeading = exec(/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/)
const execLHeading = exec(/^([^\n]+)\n *([=-]){2,} *(?:\n+|$)/)

const captureNormalHeading = (source: string): Parsed<NodeHeading> | null => {
  const [capture = '', level = [], rawValue = ''] = execHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level.length,
      rawValue,
      children: []
    },
    newSource: source.substring(capture.length)
  }
}

const captureLHeading = (source: string): Parsed<NodeHeading> | null => {
  const [capture = '', rawValue = '', level = ''] = execLHeading(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'heading',
      level: level === '=' ? 1 : 2,
      rawValue,
      children: []
    },
    newSource: source.substring(capture.length)
  }
}

const captureHeading = (source: string): Parsed<NodeHeading> | null =>
  captureNormalHeading(source) || captureLHeading(source)


export { captureHeading }
