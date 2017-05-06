import { curry } from 'utils'

const equals = curry((a: any, b: any): boolean => a === b)

export { equals }
