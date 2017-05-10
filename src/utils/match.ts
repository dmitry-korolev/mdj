import { curry } from 'utils'

const match = curry((regExp: RegExp, input: string) => input.match(regExp) || [])

export { match }
