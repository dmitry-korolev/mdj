import { exec, replace } from 'utils'

import { INodeBlockquote, INodeParagraph, IParsed, ITokenizer } from 'models'

const execBlockquote =
  exec(/^( *>[^\n]+(\n(?! *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))[^\n]+)*\n*)+/)
const clearBlockquote = replace(/^ *> ?/gm, '')
const captureBlockquote = (source: string, tokenize: ITokenizer): IParsed<INodeBlockquote> | null => {
  if (source[0] !== '>') {
    return null
  }

  const result = execBlockquote(source)

  if (!result) {
    return null
  }

  const capture = result[0]

  let children = tokenize(clearBlockquote(capture))

  if (children.length === 1 && children[0].type === 'paragraph') {
    children = (children[0] as INodeParagraph).children
  }

  return {
    token: {
      type: 'blockquote',
      children: tokenize(clearBlockquote(capture))
    },
    newSource: source.substring(capture.length)
  }
}

export { captureBlockquote }
