import { exec, match, replace, compose } from 'utils'

import { Parsed, NodeList, NodeListItem, Tokenize, NodeParagraph } from 'models'
import {  } from '../utils/match'

const execList = exec(/^( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n+(?=\1?(?:[-*_] *){3,}(?:\n+|$))|\n+(?= *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))|\n{2,}(?! )(?!\1(?:[*+-]|\d+\.) )\n*|\s*$)/)
const matchItems = match(/^( *)((?:[*+-]|\d+\.)) [^\n]*(?:\n(?!\1(?:[*+-]|\d+\.) )[^\n]*)*/gm)
const removeBullets = replace(/^ *([*+-]|\d+\.) +/, '')
const removeSpaces = replace(/^ */gm, '')
const matchBullet = match(/^(\d)/)
const precedeList = replace(/\n(?=\d*\. )/, '\n\n')

const captureList = (source: string, tokenize: Tokenize): Parsed<NodeList> | null=> {
  const [capture = '', , bull = ''] = execList(source)

  if (!capture) {
    return null
  }

  const parseChild = compose(tokenize, precedeList, removeSpaces, removeBullets)
  const topItemsParsed = matchItems(capture).map((item): NodeListItem => {
    let itemChildren = parseChild(item)

    if (itemChildren.length === 1 && itemChildren[0].type === 'paragraph') {
      itemChildren = (itemChildren[0] as NodeParagraph).children
    }

    return {
      type: 'listitem',
      children: itemChildren
    }
  })

  const startToken = matchBullet(bull)
  const token: NodeList = {
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
