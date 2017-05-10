import { curry } from 'utils'

const replace = curry((from: string | RegExp, to: string, input: string) => input.replace(from, to))

export { replace }
