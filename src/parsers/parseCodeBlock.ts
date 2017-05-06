import { isCodeBlock } from 'checkers'
import blockRules from 'rules/blockRules'

import { Parsed, NodeCodeBlock } from 'models'

const parseCodeBlock = (lines: string[], currentLine: number): Parsed<NodeCodeBlock> => {
  const input = lines[currentLine]
  const [, , language = ''] = input.match(blockRules.code) || []
  let value = ''
  let skipped = 1;

  while(!isCodeBlock(lines[currentLine + skipped])) {
    value += (skipped === 1 ? '' : '\n') + lines[currentLine + skipped]
    skipped += 1
  }

  return {
    token: {
      type: 'codeblock',
      language,
      value
    },
    skip: skipped + 1 // skip closing fence line
  }
}

export { parseCodeBlock }
