import { Parsed, NodeHR } from 'models'

const parseHR = (): Parsed<NodeHR> => ({
  token: { type: 'hr' }
})

export { parseHR }
