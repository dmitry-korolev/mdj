import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeTable } from 'models'

const rowSep = / *\| */
const getTableHeader = (source: string): string[] => source.replace(/^ *| *\| *$/g, '').split(rowSep)
const getTableCell = (input: string): string[] => input.replace(/^ *\| *| *\| *$/g, '').split(rowSep)
const getCellAlign = (input: string): string | null => {
  if (/^ *-+: *$/.test(input)) {
    return 'right'
  } else if (/^ *:-+: *$/.test(input)) {
    return 'center'
  } else if (/^ *:-+ *$/.test(input)) {
    return 'left'
  } else {
    return null
  }
}
const getTableAlign = (source: string): Array<string | null> => source.replace(/^ *|\| *$/g, '').split(rowSep).map(getCellAlign)

const execNPTable = exec(blockRules.nptable)
const execTableNormal = exec(blockRules.table)

const captureTable = (source: string, isTop: boolean): Parsed<NodeTable> | null => {
  if (!isTop) {
    return null
  }

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
        cells.replace(/\n$/, '').split('\n').map(item => item.split(rowSep)) :
        cells.replace(/(?: *\| *)?\n$/, '').split('\n').map(getTableCell)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureTable }
