import { matches } from 'utils'
import blockRules from 'rules/blockRules'

const isHR = matches(blockRules.hr)

export { isHR }
