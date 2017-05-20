import { exec, matches, replace, compose, map, split } from 'utils'

import { Parsed, NodeTable, Tokenizer, NodeItem } from 'models'

const rowSep = / *\| */
const removeHeaderBounds = replace(/^ *| *\| *$/g, '')
const removeCellBounds = replace(/^ *\| *| *\| *$/g, '')
const removeRowBounds = replace(/^ *|\| *$/g, '')
const removeLastLineBreak = replace(/\n$/, ' ')
const removeLastBounds = replace(/(?: *\| *)?\n$/, '')
const splitByLineBreak = split('\n')
const isRight = matches(/^ *-+: *$/)
const isCenter = matches(/^ *:-+: *$/)

const getTableHeader = (source: string): string[] => removeHeaderBounds(source).split(rowSep).map(item => item.trim())
const getTableRow = compose(split(rowSep), removeCellBounds)
const getCellAlign = (input: string): string | null => {
  if (isRight(input)) {
    return 'right'
  } else if (isCenter(input)) {
    return 'center'
  } else {
    return 'left'
  }
}
const getTableAlign = (source: string): Array<string | null> => removeRowBounds(source).split(rowSep).map(getCellAlign)
const getNormalCells = (lexer: Tokenizer, cells: string): NodeItem[][][] =>
  compose(map(compose(map(lexer), getTableRow)), splitByLineBreak, removeLastBounds)(cells)
const getNPCells = (lexer: Tokenizer, cells: string): NodeItem[][][] =>
  compose(map(compose(map(lexer), split(rowSep))), splitByLineBreak, removeLastLineBreak)(cells)

const execNPTable = exec(/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/)
const execTableNormal = exec(/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/)

const captureTable = (source: string, _: any, inlineLexer: Tokenizer): Parsed<NodeTable> | null => {
  let result = execNPTable(source)
  let isNP = true

  if (!result) {
    result = execTableNormal(source)
    isNP = false
  }

  if (!result) {
    return null
  }

  const capture = result[0]
  const header = result[1]
  const align = result[2]
  const cells = result[3]

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'table',
      header: getTableHeader(header),
      align: getTableAlign(align),
      cells: isNP ? getNPCells(inlineLexer, cells) : getNormalCells(inlineLexer, cells)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureTable }
