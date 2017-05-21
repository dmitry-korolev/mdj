import { compose, exec, match, replace } from 'utils'

import { INodeList, INodeListItem, INodeParagraph, IParsed, ITokenizer } from 'models'

const execList = exec(/^( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n+(?=\1?(?:[-*_] *){3,}(?:\n+|$))|\n+(?= *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))|\n{2,}(?! )(?!\1(?:[*+-]|\d+\.) )\n*|\s*$)/) // tslint:disable-line max-line-length
const matchItems = match(/^( *)((?:[*+-]|\d+\.)) [^\n]*(?:\n(?!\1(?:[*+-]|\d+\.) )[^\n]*)*/gm)
const removeBullets = replace(/^ *([*+-]|\d+\.) +/, '')
const removeSpaces = replace(/^ */gm, '')
const matchBullet = match(/^(\d)/)
const precedeList = replace(/\n(?=\d*\. )/, '\n\n')

const captureList = (source: string, tokenize: ITokenizer): IParsed<INodeList> | null => {
  const result = execList(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const bull = result[2]

  const parseChild = compose(tokenize, precedeList, removeSpaces, removeBullets)
  const topItemsParsed = matchItems(capture).map((item): INodeListItem => {
    let itemChildren = parseChild(item)

    if (itemChildren.length === 1 && itemChildren[0].type === 'paragraph') {
      itemChildren = (itemChildren[0] as INodeParagraph).children
    }

    return {
      type: 'listitem',
      children: itemChildren
    }
  })

  const startToken = matchBullet(bull)
  const token: INodeList = {
    type: 'list',
    ordered: !!startToken,
    start: startToken && +startToken[1],
    children: topItemsParsed
  }

  return {
    token,
    newSource: source.substring(capture.length)
  }
}

export { captureList }
