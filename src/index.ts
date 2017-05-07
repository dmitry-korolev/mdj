import { MDJ } from 'core/MDJ'

const parse = (source: string) => new MDJ().parse(source)

export default MDJ
export { parse }
