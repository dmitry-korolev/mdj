import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeCodeBlock } from 'models'

const execCodeNormal = exec(blockRules.code)
const captureCodeNormal = (source: string): Parsed<NodeCodeBlock> | null => {
  const [capture = ''] = execCodeNormal(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'codeblock',
      language: '',
      value: capture.replace(/^ {4}/gm, '')
    },
    newSource: source.substring(capture.length)
  }
}

const execCodeFence = exec(blockRules.fences)
const captureCodeFence = (source: string): Parsed<NodeCodeBlock> | null => {
  const [capture = '', , language = '', value = ''] = execCodeFence(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'codeblock',
      language,
      value
    },
    newSource: source.substring(capture.length)
  }
}

const captureCodeBlock = (source: string): Parsed<NodeCodeBlock> | null =>
  captureCodeNormal(source) || captureCodeFence(source)
export { captureCodeBlock }
