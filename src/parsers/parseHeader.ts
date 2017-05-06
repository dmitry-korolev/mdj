import blockRules from 'rules/blockRules'

import { Parsed, NodeHeading } from 'models'

const parseHeader = (input: string): Parsed<NodeHeading> => {
  const [, level = [], text = ''] = input.match(blockRules.heading) || []

  return {
    token: {
      type: 'heading',
      level: level.length,
      value: text
    }
  }
}

export { parseHeader }
