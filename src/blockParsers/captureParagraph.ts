import { exec, replace } from 'utils'

import { INodeParagraph, IParsed, ITokenizer } from 'models'

const execParagraph = exec(/^((?:[^\n]+\n?(?! {0,3}>))+)\n*/)
const removeLastLineBreak = replace(/\n$/, ' ')

const captureParagraph = (source: string, _: any, inlineLexer: ITokenizer): IParsed<INodeParagraph> | null => {
  const result = execParagraph(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const rawValue = result[1]

  return {
    token: {
      type: 'paragraph',
      children: inlineLexer(removeLastLineBreak(rawValue))
    },
    newSource: source.substring(capture.length)
  }
}

export { captureParagraph }
