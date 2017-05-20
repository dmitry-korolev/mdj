import { exec } from 'utils'

import { Parsed, NodeHTML } from 'models'

const execHTML = exec(/^(?:<!--[\s\S]*?--> *(?:\n|\s*$)|<((?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\b)\w+(?!:\/|[^\w\s@]*@)\b)[\s\S]+?<\/\1> *(?:\n{2,}|\s*$)|<(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\b)\w+(?!:\/|[^\w\s@]*@)\b(?:"[^"]*"|'[^']*'|[^'">])*?> *(?:\n{2,}|\s*$))/)

const captureHTML = (source: string): Parsed<NodeHTML> | null => {
  if (source[0] !== '<') {
    return null
  }

  const result = execHTML(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  return {
    token: {
      type: 'html',
      value: capture
    },
    newSource: source.substring(capture.length)
  }
}

export { captureHTML }
