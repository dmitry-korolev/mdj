import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeParagraph } from 'models'

const execParagraph = exec(blockRules.paragraph)
const captureParagraph = (source: string, isTop: boolean): Parsed<NodeParagraph> | null => {
  if (!isTop) {
    return null
  }

  const [capture = '', value = ''] = execParagraph(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'paragraph',
      value: value.replace(/\n$/, '')
    },
    newSource: source.substring(capture.length)
  }
}

export { captureParagraph }
