import { exec, replace } from 'utils'

import { Parsed, NodeCodeBlock } from 'models'

const execCodeNormal = exec(/^( {4}[^\n]+\n*)+/)
const clearCode = replace(/^ {4}/gm, '')
const execCodeFence = exec(/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/)

const captureCodeNormal = (source: string): Parsed<NodeCodeBlock> | null => {
  if (source[0] !== '`') {
    return null
  }

  const [capture = ''] = execCodeNormal(source)

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'codeblock',
      language: '',
      value: clearCode(capture)
    },
    newSource: source.substring(capture.length)
  }
}

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
