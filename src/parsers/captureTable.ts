import { exec, matches, replace } from 'utils'

import { Parsed, NodeTable } from 'models'

const rowSep = / *\| */
const removeHeaderBounds = replace(/^ *| *\| *$/g, '')
const removeCellBounds = replace(/^ *\| *| *\| *$/g, '')
const removeRowBounds = replace(/^ *|\| *$/g, '')
const removeLastLineBreak = replace(/\n$/, ' ')
const removeLastBounds = replace(/(?: *\| *)?\n$/, '')
const splitByLineBreak = (input: string) => input.split('\n')
const isRight = matches(/^ *-+: *$/)
const isCenter = matches(/^ *:-+: *$/)

const getTableHeader = (source: string): string[] => removeHeaderBounds(source).split(rowSep).map(item => item.trim())
const getTableCell = (input: string): string[] => removeCellBounds(input).split(rowSep)
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

const execNPTable = exec(/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/)
const execTableNormal = exec(/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/)

const captureTable = (source: string): Parsed<NodeTable> | null => {
  let result = execNPTable(source)
  let isNP = true

  if (!result.length) {
    result = execTableNormal(source)
    isNP = false
  }

  const [capture = '', header = '', align = '', cells = ''] = result

  if (!capture) {
    return null
  }

  return {
    token: {
      type: 'table',
      header: getTableHeader(header),
      align: getTableAlign(align),
      cells: isNP ?
        splitByLineBreak(removeLastLineBreak(cells)).map(item => item.split(rowSep)) :
        splitByLineBreak(removeLastBounds(cells)).map(getTableCell)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureTable }
