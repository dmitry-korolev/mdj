import { compose, exec, map, matches, replace, split, trim } from 'utils'

import { INodeItem, INodeTable, IParsed, ITokenizer } from 'models'

const rowSep = / *\| */
const removeHeaderBounds = replace(/^ *| *\| *$/g, '')
const removeCellBounds = replace(/^ *\| *| *\| *$/g, '')
const removeRowBounds = replace(/^ *|\| *$/g, '')
const removeLastLineBreak = replace(/\n$/, ' ')
const removeLastBounds = replace(/(?: *\| *)?\n$/, '')
const splitByLineBreak = split('\n')
const isRight = matches(/^ *-+: *$/)
const isCenter = matches(/^ *:-+: *$/)

const splitRow = (input: string) => {
  const result: string[] = []
  let cell = 0

  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === '|' && input[i - 1] !== '`' && input[i - 1] !== '\\') {
      cell++
      continue
    }
    result[cell] = (result[cell] || '') + input[i]
  }

  return map(trim, result)
}

const getTableHeader = (lexer: ITokenizer, source: string): INodeItem[][] =>
  compose(map(lexer), splitRow, removeHeaderBounds)(source)
const getTableRow = compose(splitRow, removeCellBounds)
const getCellAlign = (input: string): string | null => {
  if (isRight(input)) {
    return 'right'
  } else if (isCenter(input)) {
    return 'center'
  } else {
    return 'left'
  }
}
const getTableAlign = compose(map(getCellAlign), split(rowSep), removeRowBounds)
const getNormalCells = (lexer: ITokenizer, cells: string): INodeItem[][][] =>
  compose(map(compose(map(lexer), getTableRow)), splitByLineBreak, removeLastBounds)(cells)
const getNPCells = (lexer: ITokenizer, cells: string): INodeItem[][][] =>
  compose(map(compose(map(lexer), split(rowSep))), splitByLineBreak, removeLastLineBreak)(cells)

const execNPTable = exec(/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/)
const execTableNormal = exec(/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/)

const captureTable = (source: string, _: any, inlineLexer: ITokenizer): IParsed<INodeTable> | null => {
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
      header: getTableHeader(inlineLexer, header),
      align: getTableAlign(align),
      cells: isNP ? getNPCells(inlineLexer, cells) : getNormalCells(inlineLexer, cells)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureTable }
