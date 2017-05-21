import { exec } from 'utils'

import { INodeHTML, IParsed } from 'models'

const execInlineHTML = exec(/^(?:<(a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img))(?: *\S+=['"].*['"])*(?: *\/>|>.*?<\/\1>)/) // tslint:disable-line max-line-length

const captureInlineHTML = (source: string): IParsed<INodeHTML> | null => {
  if (source[0] !== '<') {
    return null
  }

  const result = execInlineHTML(source)

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

export { captureInlineHTML }
