import { matches } from 'utils'
import blockRules from 'rules/blockRules'

const isHeading = matches(blockRules.heading)

export { isHeading }
