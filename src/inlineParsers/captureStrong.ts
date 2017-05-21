import { exec } from 'utils'

import { INodeStrong, IParsed, ITokenizer } from 'models'

const execStrong = exec(/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/)
const captureStrong = (source: string, inlineLexer: ITokenizer): IParsed<INodeStrong> | null => {
  if (source[0] !== '_' && source[0] !== '*') {
    return null
  }

  const result = execStrong(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const a = result[1]
  const b = result[2]

  return {
    token: {
      type: 'strong',
      children: inlineLexer(b || a)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureStrong }
