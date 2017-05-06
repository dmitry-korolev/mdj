import { matches } from 'utils'
import blockRules from 'rules/blockRules'

const isCodeBlock = matches(blockRules.code)

export { isCodeBlock }
