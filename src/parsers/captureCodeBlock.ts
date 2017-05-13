import { exec, replace } from 'utils'

import { Parsed, NodeCodeBlock } from 'models'

const execCodeNormal = exec(/^( {4}[^\n]+\n*)+/)
const clearCode = replace(/^ {4}/gm, '')
const execCodeFence = exec(/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/)

const captureCodeNormal = (source: string): Parsed<NodeCodeBlock> | null => {
  if (source[0] !== '`') {
    return null
  }

  const result = execCodeNormal(source)

  if (!result) {
    return null
  }

  const capture = result[0]

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
  const result = execCodeFence(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const language = result[2]
  const value = result[3]

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
