import { matches } from 'utils'
import blockRules from 'rules/blockRules'

const isBlockquote: (input: string) => boolean = matches(blockRules.blockquote)

export { isBlockquote }
