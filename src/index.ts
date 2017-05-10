import { MDJ } from 'core/MDJ'

const parse = (source: string) => MDJ()
  .parse(source)

export default MDJ
export { parse }
