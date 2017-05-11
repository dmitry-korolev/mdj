import { curry } from 'utils'

const split = curry((regExp: RegExp | string, input: string) => input.split(regExp) || [])

export { split }
