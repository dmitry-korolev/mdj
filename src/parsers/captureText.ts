if (cap = this.rules.text.exec(src)) {
  // Top-level should never reach here.
  src = src.substring(cap[0].length)
  this.tokens.push({
    type: 'text',
    text: cap[0]
  })
  continue
}
import { exec } from 'utils'
import blockRules from 'rules/blockRules'

import { Parsed, NodeText } from 'models'

const captureText = (source: string): Parsed<NodeText> | null => {
  const [capture = ''] = blockRules.text.exec(source) || []

  if (!capture) {
    return null
  }


}