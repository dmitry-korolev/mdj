import { Parsed, NodeSpace } from 'models'

const parseSpace = (): Parsed<NodeSpace> => ({
  token: { type: 'space' }
})

export { parseSpace }
